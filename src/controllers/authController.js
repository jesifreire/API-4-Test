const authService = require('../services/authService');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'username and password are required' });
    }

    const token = await authService.login(username, password);
    if (!token) {
      return res.status(401).json({ message: 'invalid credentials' });
    }

    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
