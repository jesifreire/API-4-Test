const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const{ graphqlHTTP } = require('express-graphql');
const {schema, root } = require('./src/graphql/schema');

const app = express();
app.use(bodyParser.json());


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Login',
      version: '1.0.0',
      description: 'Documentação da API de Login com Swagger'
    }
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/auth', authRoutes);

const userRoutes = require('./src/routes/user');
app.use('/users', userRoutes);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
