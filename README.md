# API Login - Node.js (Controller / Service / Model)

Projeto de exemplo com separação de responsabilidades (Controller, Service, Model) e testes que isolam o Controller do Service.

## O que tem aqui
- API simples em Express com rota POST `/auth/login`
- Separação por `src/controllers`, `src/services` e `src/models`
- 5 testes com Mocha + Chai + Sinon + SuperTest que chamam o `app` e STUBAM o `authService` (isolando o Controller)
- Workflow do GitHub Actions para rodar os testes

## Requisitos
- Node.js 18.x ou superior
- npm (vem com o Node)

## Como rodar localmente
1. Extraia o projeto (se você baixou o zip) ou clone o repositório.
2. Na pasta do projeto, instale dependências:
   ```bash
   npm install
   ```
3. Rodar a API:
   ```bash
   npm start
   # ou em desenvolvimento com reload:
   npm run dev
   ```
   A API ficará disponível em `http://localhost:3000`

## Rodar os testes
```bash
npm test
```
Os testes usam Mocha e SuperTest. Eles chamam o `app` em memória e STUBAM `authService.login` para isolar a camada de Controller.

## Estrutura do projeto
```
api-login/
├─ package.json
├─ README.md
├─ .gitignore
├─ app.js
├─ server.js
├─ src/
│  ├─ routes/
│  │  └─ auth.js
│  ├─ controllers/
│  │  └─ authController.js
│  ├─ services/
│  │  └─ authService.js
│  └─ models/
│     └─ userModel.js
└─ test/
   └─ auth.controller.test.js
```

## CI (GitHub Actions)
O workflow `.github/workflows/ci.yml` roda os testes automaticamente em pushes e pull requests para as branches `main`/`master`.


## Teste de Performance com k6

Adicionei um script de performance em `test/perf/login.k6.js` que exemplifica os conceitos exigidos no desafio.

Trechos e onde os conceitos foram aplicados:


```js
thresholds: {
   'http_req_duration': ['p(95)<800'],
   'login_duration': ['avg<1000'],
}
```











Como executar o teste de performance (requisitos):

1. Instale o k6 na sua máquina (instruções em https://k6.io/docs/getting-started/installation).

### Exemplo de uso de Groups e Helpers

O exemplo abaixo demonstra como documentar no README o uso de `group` e de um helper importado — adaptei para o caminho do seu projeto (`test/perf/login.k6.js` e `test/perf/helpers.js`):

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

No trecho acima mostramos claramente o arquivo onde o código está (`test/perf/login.k6.js`), o uso de `group('Login User', ...)` e a importação/uso do helper `buildLoginPayload` (localizado em `test/perf/helpers.js`). Isso segue o mesmo padrão do exemplo fornecido.
2. Inicie sua API (por exemplo `npm start`).
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

