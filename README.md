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

