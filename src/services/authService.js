const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'segredo123';

const users = [
  { username: 'admin', password: '123' },
  { username: 'jesi', password: 'password123' }
];

async function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return { token };
  }

  return null; // não lança erro; controller responde 401
}

module.exports = { login };
