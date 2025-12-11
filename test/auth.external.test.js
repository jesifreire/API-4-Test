const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Fluxo de autenticação (external)', () => {
  let token;

  it('deve retornar token no login válido', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: '123' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('deve negar acesso sem token', async () => {
    const res = await request(app).get('/users/me');
    expect(res.status).to.equal(401);
  });

  it('deve permitir acesso com token válido', async () => {
    const res = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.contain('Bem-vindo');
  });
});
