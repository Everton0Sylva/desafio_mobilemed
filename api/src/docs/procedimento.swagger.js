import { criarProcedimentoDto } from "../modules/procedimento/dto/criarProcedimento.dto.js";

import { alterarProcedimentoDto } from "../modules/procedimento/dto/alterarProcedimento.dto.js";

import { trocarStatusProcedimentoDto } from "../modules/procedimento/dto/trocarStatusProcedimento.dto.js";

import { buscarProcedimentosDto } from "../modules/procedimento/dto/buscarProcedimentos.dto.js";
import { buscarProcedimentoPorIdDto } from "../modules/procedimento/dto/buscarProcedimentoPorId.dto.js";
import { listarProcedimentosDto } from "../modules/procedimento/dto/listarProcedimentos.dto.js";

export function registerProcedimentoPaths(registry) {
  registry.registerPath({
    method: "post",

    path: "/procedimentos",

    tags: ["Procedimentos"],

    summary: "Criar procedimento",

    request: {
      body: {
        content: {
          "application/json": {
            schema: criarProcedimentoDto,
          },
        },
      },
    },

    responses: {
      201: {
        description: "Procedimento criado",
      },
    },
  });

  registry.registerPath({
    method: "get",

    path: "/procedimentos?page=x&pageSize=y",

    tags: ["Procedimentos"],

    summary: "Listar procedimentos",

    request: {
      params: listarProcedimentosDto,
    },

    responses: {
      200: {
        description: "Lista paginada de procedimentos",
      },
    },
  });

  registry.registerPath({
    method: "get",

    path: "/procedimentos?nome=x&sigla=y&cboEspecialidade=z&codTuss=w",

    tags: ["Procedimentos"],

    summary: "Buscar procedimentos",

    description: "Busca por nome, sigla, cboEspecialidade ou codTuss",

    request: {
      query: buscarProcedimentosDto,
    },

    responses: {
      200: {
        description: "Procedimentos encontrados",
      },
    },
  });

  registry.registerPath({
    method: "get",

    path: "/procedimentos/{id}",

    tags: ["Procedimentos"],

    summary: "Buscar procedimento por id",

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

  registry.registerPath({
    method: "put",

    path: "/procedimentos/{id}",

    tags: ["Procedimentos"],

    summary: "Alterar procedimento",

    request: {
          params: buscarProcedimentoPorIdDto,

      body: {
        required: true,

        content: {
          "application/json": {
            schema: alterarProcedimentoDto,
          },
        },
      },
    },

    responses: {
      200: {
        description: "Procedimento alterado com sucesso",
      },

      400: {
        description: "Dados inválidos",
      },

      404: {
        description: "Procedimento não encontrado",
      },
    },
  });

  registry.registerPath({
    method: "patch",

    path: "/procedimentos/{id}/status",

    tags: ["Procedimentos"],

    summary: "Alterar status do procedimento",

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
        description: "Status alterado com sucesso",
      },

      404: {
        description: "Procedimento não encontrado",
      },
    },
  });
  
}
