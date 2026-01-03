import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js TypeScript API với Swagger',
      version: '1.0.0',
      description: 'Tài liệu hướng dẫn sử dụng API cho dự án Node.js',
    },
    servers: [
      {
        url: 'http://localhost:'+ (process.env.PORT || '4000'),
      },
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
  },
  // Đường dẫn đến các file chứa chú thích Swagger (JSDoc)
  apis: ['./src/routes/*.ts', './src/app.ts'],
};