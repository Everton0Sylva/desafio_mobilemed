import { criarExameDto } from "../modules/exame/dto/criarExame.dto.js";
import { alterarExameDto } from "../modules/exame/dto/alterarExame.dto.js";
import { trocarStatusExameDto } from "../modules/exame/dto/trocarStatusExame.dto.js";
import { buscarExamesDto } from "../modules/exame/dto/buscarExames.dto.js";
import { buscarExamePorIdDto } from "../modules/exame/dto/buscarExamePorId.dto.js";
import { listarExamesDto } from "../modules/exame/dto/listarExames.dto.js";

export function registerExamePaths(registry) {
  registry.registerPath({
    method: "post",
    path: "/exames",
    tags: ["Exames"],
    summary: "Criar exame",
    request: {
      body: {
        content: {
          "application/json": {
            schema: criarExameDto,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Exame criado",
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/exames?page=x&pageSize=y",
    tags: ["Exames"],
    summary: "Listar exames",
    request: {
      params: listarExamesDto,
    },
    responses: {
      200: {
        description: "Lista paginada de exames",
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/exames?pacienteId=x&procedimentoExameId=y&status=z",
    tags: ["Exames"],
    summary: "Buscar exames",
    description: "Busca por paciente, procedimento ou status",
    request: {
      query: buscarExamesDto,
    },
    responses: {
      200: {
        description: "Exames encontrados",
      },
    },
  });

  registry.registerPath({
    method: "get",
    path: "/exames/{id}",
    tags: ["Exames"],
    summary: "Buscar exame por id",
    request: {
      params: buscarExamePorIdDto,
    },
    responses: {
      200: {
        description: "Exame encontrado",
      },
      404: {
        description: "Exame não encontrado",
      },
    },
  });

  registry.registerPath({
    method: "put",
    path: "/exames/{id}",
    tags: ["Exames"],
    summary: "Alterar exame",
    request: {
      params: buscarExamePorIdDto,
      body: {
        required: true,
        content: {
          "application/json": {
            schema: alterarExameDto,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Exame alterado com sucesso",
      },
      400: {
        description: "Dados inválidos",
      },
      404: {
        description: "Exame não encontrado",
      },
    },
  });

  registry.registerPath({
    method: "patch",
    path: "/exames/{id}/status",
    tags: ["Exames"],
    summary: "Alterar status do exame",
    request: {
      params: buscarExamePorIdDto,
      body: {
        required: true,
        content: {
          "application/json": {
            schema: trocarStatusExameDto,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Status alterado com sucesso",
      },
      404: {
        description: "Exame não encontrado",
      },
    },
  });
}
