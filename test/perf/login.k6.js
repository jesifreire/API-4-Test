import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import { randomEmail, randomString, buildLoginPayload } from './helpers.js';

// Carrega dados (data-driven)
const users = new SharedArray('users', function () {
  return JSON.parse(open('./users.json')).users;
});

// Trend customizada para medir duração do login
const loginTrend = new Trend('login_duration');

export let options = {
  stages: [
    { duration: '10s', target: 5 }, // aquecimento
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    // 95% das requisições devem estar abaixo de 800ms
    'http_req_duration': ['p(95)<800'],
    // garantir que o trend médio esteja razoável
    'login_duration': ['avg<1000'],
  },
};

// setup: pega um token reutilizável (reaproveitamento da resposta)
export function setup() {
  const base = __ENV.BASE_URL || 'http://localhost:3000';
  const admin = __ENV.PERF_USER || users[0].username;
  const adminPass = __ENV.PERF_PASS || users[0].password;

  const res = http.post(`${base}/auth/login`, buildLoginPayload(admin, adminPass), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'setup login status 200': (r) => r.status === 200,
    'setup has token': (r) => !!r.json('token'),
  });

  const token = res.json('token') || '';
  return { token };
}

export default function (data) {
  const base = __ENV.BASE_URL || 'http://localhost:3000';
  // escolhe um usuário do array (data-driven)
  const u = users[__VU % users.length];

  group('login flow', function () {
    const payload = buildLoginPayload(u.username, u.password);
    const params = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(`${base}/auth/login`, payload, params);

    // checks: validar comportamento esperado
    check(res, {
      'status is 200 or 401': (r) => r.status === 200 || r.status === 401,
      'has token when 200': (r) => (r.status === 200 ? !!r.json('token') : true),
    });

    loginTrend.add(res.timings.duration);

    // se obteve token, testar endpoint protegido com token (reaproveitamento)
    if (res.status === 200) {
      const token = res.json('token');
      const authRes = http.get(`${base}/protected/resource`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      check(authRes, { 'protected 200': (r) => r.status === 200 });
    }

    sleep(Math.random() * 2);
  });
}
