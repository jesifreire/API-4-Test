const { buildSchema } = require('graphql');
const authService = require('../services/authService');
const { findByUsername } = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'segredo123';

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String
    message: String
  }

  type Query {
    me(token: String!): User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
  }
`);

const root = {
  login: async ({ username, password }) => {
    const result = await authService.login(username, password);
    if (!result) {
      return { message: 'Invalid credentials' };
    }
    return { token: result.token };
  },
  me: async ({ token }) => {
    try {
      const decoded = jwt.verify(token, SECRET);
      const user = await findByUsername(decoded.username);
      if (!user) return null;
      return { id: user.id, username: user.username };
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
};

module.exports = { schema, root };
