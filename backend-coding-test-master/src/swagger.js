const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Xendit API Documentation',
      version: '1.0.0'
    }
  },
  apis: ['./src/documentation.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
