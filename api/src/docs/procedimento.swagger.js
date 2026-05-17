import { criarProcedimentoDto } from "../modules/procedimento/dto/criarProcedimento.dto.js";

import { atualizarProcedimentoDto } from "../modules/procedimento/dto/atualizarProcedimento.dto.js";

import { trocarStatusProcedimentoDto } from "../modules/procedimento/dto/trocarStatusProcedimento.dto.js";

import { buscarProcedimentoPorIdDto } from "../modules/procedimento/dto/buscarProcedimentoPorId.dto.js";
import { listarProcedimentosDto } from "../modules/procedimento/dto/listarProcedimentos.dto.js";

export function registerProcedimentoPaths(registry) {
  registry.registerPath({
    method: "put",

    path: "/procedimentos/{id}",

    tags: ["Procedimentos"],

    summary: "Atualizar procedimento",

    request: {
      params: buscarProcedimentoPorIdDto,

      body: {
        required: true,

        content: {
          "application/json": {
            schema: atualizarProcedimentoDto,
          },
        },
      },
    },

    responses: {
      200: {
        description: "Procedimento atualizado",
      },

      404: {
        description: "Procedimento não encontrado",
      },
    },
  });

  registry.registerPath({
    method: "get",

    path: "/procedimentos?page=x&pageSize=y",

    tags: ["Procedimentos"],

    summary: "Listar procedimentos paginado",

    request: {
      query: listarProcedimentosDto,
    },

    responses: {
      200: {
        description: "Lista paginada de procedimentos",
      },
    },
  });

  registry.registerPath({
    method: "get",

    path: "/procedimentos/{id}",

    tags: ["Procedimentos"],

    summary: "Buscar Procedimento por id",

    request: {
      params: buscarProcedimentoPorIdDto,
    },

    responses: {
      200: {
        description: "Procedimento encontrado",
      },

      404: {
        description: "Procedimento não encontrado",
      },
    },
  });

  registry.register("CriarProcedimentoDto", criarProcedimentoDto);

  registry.registerPath({
    method: "post",

    path: "/procedimentos",

    tags: ["Procedimentos"],

    summary: "Criar procedimento",

    request: {
      body: {
        required: true,

        content: {
          "application/json": {
            schema: criarProcedimentoDto,
          },
        },
      },
    },

    responses: {
      201: {
        description: "Procedimento criado com sucesso",
      },
    },
  });

  registry.registerPath({
    method: "patch",

    path: "/procedimentos/{id}",

    tags: ["Procedimentos"],

    summary: "Alterar status do Procedimento",

    request: {
      params: buscarProcedimentoPorIdDto,

      body: {
        required: true,

        content: {
          "application/json": {
            schema: trocarStatusProcedimentoDto,
          },
        },
      },
    },

    responses: {
      200: {
        description: "Status do Procedimento alterado com sucesso",
      },

      404: {
        description: "Procedimento não encontrado",
      },
    },
  });
}
