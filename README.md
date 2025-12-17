
# API de Autenticação Node.js (REST & GraphQL)

> Projeto completo de autenticação com Express, JWT, GraphQL, documentação Swagger e testes automatizados.

## Funcionalidades
- Autenticação via REST (`/auth/login`) e GraphQL (`/graphql`)
- Proteção de rotas com JWT (`/users/me`)
- Documentação interativa com Swagger (`/api-docs`)
- Testes automatizados (Mocha, Chai, Sinon, SuperTest)

## Requisitos
- Node.js 18.x ou superior
- npm (geralmente já vem com o Node)

## Instalação e Execução
1. Clone o repositório ou extraia o zip.
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Inicie a API:
    ```bash
    npm start
    # ou em modo desenvolvimento (auto-reload):
    npm run dev
    ```
    O servidor estará em `http://localhost:3000`

## Endpoints REST
- `POST /auth/login` — Faz login e retorna um token JWT
- `GET /users/me` — Retorna dados do usuário autenticado (requer token JWT no header Authorization)

## GraphQL
- Endpoint: `http://localhost:3000/graphql`
- Playground interativo disponível ao acessar o endpoint no navegador

### Exemplo de Mutation (login)
```graphql
mutation {
   login(username: "jesi", password: "password123") {
      token
      message
   }
}
```

### Exemplo de Query (usuário autenticado)
```graphql
query {
   me(token: "SEU_TOKEN_JWT") {
      id
      username
   }
}
```

## Documentação Swagger
- Acesse: `http://localhost:3000/api-docs`

## Testes Automatizados
Execute:
```bash
npm test
```
Os testes cobrem autenticação, proteção de rotas e integração REST.

## Estrutura do Projeto
```
├─ app.js
├─ server.js
├─ package.json
├─ README.md
├─ src/
│  ├─ controllers/
│  │  └─ authController.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  └─ userModel.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  └─ user.js
│  ├─ services/
│  │  └─ authService.js
│  └─ graphql/
│     └─ schema.js
├─ test/
│  ├─ auth.controller.test.js
│  └─ auth.external.test.js
```

## Variáveis de Ambiente
- `JWT_SECRET` — (opcional) Segredo para assinar tokens JWT. Padrão: `segredo123`
- `PORT` — (opcional) Porta do servidor. Padrão: `3000`

## CI (GitHub Actions)
O workflow `.github/workflows/ci.yml` executa os testes automaticamente em pushes e pull requests para as branches `main`/`master`.


## Teste de Performance com k6

O script de performance está em `test/perf/login.k6.js` 

Onde os conceitos foram aplicados:


```js
thresholds: {
   'http_req_duration': ['p(95)<800'],
   'login_duration': ['avg<1000'],
}
```

Como executar o teste de performance (requisitos):

1. Instale o k6 na sua máquina (instruções em https://k6.io/docs/getting-started/installation).

### Exemplo de uso de Groups e Helpers

```js
// arquivo: test/perf/login.k6.js
import { buildLoginPayload } from './helpers.js';
import http from 'k6/http';
import { group } from 'k6';

group('Login User', function () {
   const payload = buildLoginPayload('jesi', 'password123');
   const res = http.post(`${__ENV.BASE_URL || 'http://localhost:3000'}/auth/login`, payload, { headers: { 'Content-Type': 'application/json' } });
});
```

No trecho acima podemos ver onde o código está (`test/perf/login.k6.js`), o uso de `group('Login User', ...)` e a importação/uso do helper `buildLoginPayload` (localizado em `test/perf/helpers.js`).
2. Inicie a API (por exemplo `npm start`).
3. Execute o k6 (exemplo usando as variáveis de ambiente):

```powershell
$env:BASE_URL = 'http://localhost:3000';
k6 run test/perf/login.k6.js
```
ou usando o script npm (requer que o binário `k6` esteja no PATH):

```powershell
npm run perf
```
Observação: se quiser alterar usuário/senha usados no `setup`, exporte `PERF_USER` e `PERF_PASS` como variáveis de ambiente.

