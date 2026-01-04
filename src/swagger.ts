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
        url: 'http://localhost:' + (process.env.PORT || '4000'),
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
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            code: { type: 'string', example: '00047' },
            message: { type: 'string', example: 'Thao tác thành công' },
            data: { type: 'object', nullable: true }
          }
        }
      }
    },
  },
  apis: ['./src/routes/*.ts', './src/app.ts'],
};