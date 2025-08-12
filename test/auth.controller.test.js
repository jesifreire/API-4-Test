const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');

const app = require('../app');
const authService = require('../src/services/authService');

describe('Auth Controller - /auth/login', () => {
  afterEach(() => sinon.restore());

  it('Deve retornar 200 e um token quando as credenciais forem válidas', async () => {
   
    const fakeToken = 'token-jesi-123';
    const loginStub = sinon.stub(authService, 'login').resolves(fakeToken);

    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'jesi', password: 'password123' });


    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token', fakeToken);
    expect(loginStub.calledOnceWithExactly('jesi', 'password123')).to.be.true;
  });

  it('Deve retornar 401 quando as credenciais forem inválidas', async () => {
    sinon.stub(authService, 'login').resolves(null);

    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'jesi', password: 'wrong' });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'invalid credentials');
  });

  it('Deve retornar 400 quando o nome de usuário ou a senha estiverem faltando', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'jesi' }); 

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'username and password are required');
  });

  it('Deve chamar o next com erro quando o serviço lançar uma exceção', async () => {
    const error = new Error('boom');
    sinon.stub(authService, 'login').rejects(error);

    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'jesi', password: 'password123' });

    
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('error').that.is.a('string');
  });

  it('Deve garantir que o controller chame o serviço uma vez em uma tentativa válida', async () => {
    const loginStub = sinon.stub(authService, 'login').resolves('token-abc');

    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'bob', password: 'secret' });

    expect(res.status).to.equal(200);
    expect(loginStub.calledOnce).to.be.true;
  });
});
