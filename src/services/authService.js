const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo123';

const users = [
  { username: 'admin', password: '123' },              // já usado nos seus testes
  { username: 'jesi', password: 'password123' }        // adicional para seus testes no GraphQL
];

async function login(username, password) {
  
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return { token };
  }

  throw new Error('Credenciais inválidas');
}

module.exports = { login };
