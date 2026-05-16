import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { criarPacienteDto } from "../modules/paciente/dto/criarPaciente.dto.js";
import { buscarPacientesDto } from "../modules/paciente/dto/buscarPacientes.dto.js";
import { buscarPacientePorIdDto } from "../modules/paciente/dto/buscarPacientePorId.dto.js";
import { atualizarPacienteDto } from "../modules/paciente/dto/atualizarPaciente.dto.js";
import { listarPacientesDto } from "../modules/paciente/dto/listarPacientes.dto.js";
import { trocaStatusPacienteDto } from "../modules/paciente/dto/trocaStatusPaciente.dto.js";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "put",

  path: "/pacientes/{id}",

  tags: ["Pacientes"],

  summary: "Atualizar paciente",

  request: {
    params: buscarPacientePorIdDto,

    body: {
      required: true,

      content: {
        "application/json": {
          schema: atualizarPacienteDto,
        },
      },
    },
  },

  responses: {
    200: {
      description: "Paciente atualizado",
    },

    404: {
      description: "Paciente não encontrado",
    },
  },
});

registry.registerPath({
  method: "get",

  path: "/pacientes?page=x&pageSize=y",

  tags: ["Pacientes"],

  summary: "Listar pacientes paginado",

  request: {
    query: listarPacientesDto,
  },

  responses: {
    200: {
      description: "Lista paginada de pacientes",
    },
  },
});

registry.registerPath({
  method: "get",

  path: "/pacientes?documento=12345678900",

  tags: ["Pacientes"],

  summary: "Buscar pacientes por nome ou documento",

  request: {
    query: buscarPacientesDto,
  },

  responses: {
    200: {
      description: "Pacientes encontrados",
    },
  },
});

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

  method: 'patch',

  path: '/pacientes/{id}',

  tags: ['Pacientes'],

  summary:
    'Alterar status do paciente',

  request: {

    params:
      buscarPacientePorIdDto,

    body: {

      required: true,

      content: {

        'application/json': {

          schema:
            trocaStatusPacienteDto
        }
      }
    }
  },

  responses: {

    200: {

      description:
        'Status alterado com sucesso'
    },

    404: {

      description:
        'Paciente não encontrado'
    }
  }
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
