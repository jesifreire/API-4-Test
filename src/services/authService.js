const userModel = require('../models/userModel');

async function login(username, password) {
  const user = await userModel.findByUsername(username);
  if (!user) return null;

  if (user.password !== password) return null;

  return `token-${user.username}-123`;
}

module.exports = { login };
