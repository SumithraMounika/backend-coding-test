const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Xendit API Documentation',
      version: '1.0.0',
      description:
        'This is a backend application made with Express and documented with Swagger',
      contact: {
        name: 'Sumithra Mounika',
        url: 'https://www.linkedin.com/in/sumithra-mounika-yalamarty-a7413757/',
        email: 'mounika.yrs@gmail.com'
      }
    }
  },
  apis: ['./src/documentation.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
