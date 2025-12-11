
const users = [
  { id: 1, username: 'jesi', password: 'password123' },
  { id: 2, username: 'bob', password: 'secret' }
];

async function findByUsername(username) {
  return users.find(u => u.username === username) || null;
}

module.exports = { findByUsername };
