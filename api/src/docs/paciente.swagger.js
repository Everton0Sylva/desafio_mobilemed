import { criarPacienteDto } from "../modules/paciente/dto/criarPaciente.dto.js";
import { atualizarPacienteDto } from "../modules/paciente/dto/atualizarPaciente.dto.js";
import { listarPacientesDto } from "../modules/paciente/dto/listarPacientes.dto.js";
import { trocaStatusPacienteDto } from "../modules/paciente/dto/trocaStatusPaciente.dto.js";
import { buscarPacientePorIdDto } from "../modules/paciente/dto/buscarPacientePorId.dto.js";

export function registerPacientePaths(registry) {
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

    path: "/pacientes/{id}",

    tags: ["Pacientes"],

    summary: "Buscar paciente por id",

    request: {
      params: buscarPacientePorIdDto,
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
    method: "patch",

    path: "/pacientes/{id}",

    tags: ["Pacientes"],

    summary: "Alterar status do paciente",

    request: {
      params: buscarPacientePorIdDto,

      body: {
        required: true,

        content: {
          "application/json": {
            schema: trocaStatusPacienteDto,
          },
        },
      },
    },

    responses: {
      200: {
        description: "Status alterado com sucesso",
      },

      404: {
        description: "Paciente não encontrado",
      },
    },
  });
}
