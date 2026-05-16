import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { criarPacienteDto } from "../modules/paciente/dto/criarPaciente.dto.js";
import { buscarPacientesDto } from "../modules/paciente/dto/buscarPacientes.dto.js";

const registry = new OpenAPIRegistry();

registry.register("CriarPacienteDto", criarPacienteDto);

registry.registerPath({
  method: "post",

  path: "/pacientes",

  tags: ["Pacientes"],

  summary: "Criar paciente",

  request: {
    body: {
      required: true,

      content: {
        "application/json": {
          schema: criarPacienteDto,
        },
      },
    },
  },

  responses: {
    201: {
      description: "Paciente criado com sucesso",
    },
  },
});

registry.registerPath({
  method: "get",

  path: "/pacientes?page=x&pageSize=y",

  tags: ["Pacientes"],

  summary: "Buscar pacientes paginado",

  request: {
    query: buscarPacientesDto,
  },

  responses: {
    200: {
      description: "Lista de pacientes",
    },
  },
});

registry.registerPath({
  method: "get",

  path: "/pacientes/{id}",

  tags: ["Pacientes"],

  summary: "Buscar paciente por ID",

  request: {
    params: criarPacienteDto.pick({
      id: true,
    }),
  },

  responses: {
    200: {
      description: "Paciente encontrado",
    },

    404: {
      description: "Paciente não encontrado",
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const swaggerSpec = generator.generateDocument({
  openapi: "3.0.0",

  info: {
    title: "Clínica API",

    version: "1.0.0",
  },

  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
});
