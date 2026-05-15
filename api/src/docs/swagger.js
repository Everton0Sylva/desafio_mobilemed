import swaggerJsdoc from "swagger-jsdoc";

const swaggerDocument = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clinica API",
      version: "1.0.0",
      description: "Documentação Swagger para a API da clínica",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/modules/**/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(swaggerDocument);
