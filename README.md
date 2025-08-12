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

## Como versionar e subir para o GitHub (passo-a-passo)
1. Inicialize git (se ainda não):
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   ```
2. Crie um repositório no GitHub (pela interface web).
3. Adicione o remote e envie a branch principal:
   ```bash
   git branch -M main
   git remote add origin git@github.com:SEU_USUARIO/NOME_DO_REPO.git
   git push -u origin main
   ```

## Roteiro e dicas para gravação do vídeo (explicando cada linha dos testes)
- Objetivo do vídeo: mostrar o que cada linha do arquivo `test/auth.controller.test.js` faz e por que cada escolha foi tomada.
- Sugestão de estrutura (para cada teste):
  1. Diga o objetivo do teste (ex.: validar resposta 200 com token).
  2. Explique os imports (`chai`, `supertest`, `sinon`, `app`, `authService`).
  3. Explique `afterEach(() => sinon.restore())` — restaura stubs entre testes.
  4. Explique a criação do `sinon.stub(...)` e por que isolamos o Service.
  5. Mostre a requisição com `request(app).post('/auth/login').send(...)` — SuperTest usa o `app` em memória.
  6. Explique as asserções (`expect(...)`).
  7. Mostre o terminal rodando `npm test` e destaque os testes passando.
- Ferramentas sugeridas para gravação: OBS Studio, Loom, ou gravações nativas do sistema.
- Duração sugerida: 3–6 minutos por teste se quiser detalhar; 8–12 minutos se fizer explicações gerais e execução dos testes.

## Próximos passos (opcional)
- Substituir token simulado por JWT (`jsonwebtoken`).
- Hash de senhas com `bcrypt` ou `bcryptjs`.
- Adicionar testes unitários para o Service e para o Model (mockando DB).
- Cobertura de testes com `nyc` ou `istanbul`.

---
Se quiser, eu já envio o `.zip` pronto para download. Também posso ajustar o README (mais curto, traduzido parcialmente, ou com comandos para Windows/powershell). Diga como prefere.
