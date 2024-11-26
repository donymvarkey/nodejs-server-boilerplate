const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node API',
      description: 'API endpoints documentation',
      contact: {
        name: '',
        email: '',
        url: '',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/',
        description: 'Development',
      },
      // More URLS here
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerSpec };
