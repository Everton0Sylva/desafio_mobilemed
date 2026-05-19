import { criarExameDto } from "../modules/exame/dto/criarExame.dto.js";
import { alterarExameDto } from "../modules/exame/dto/alterarExame.dto.js";
import { trocarStatusExameDto } from "../modules/exame/dto/trocarStatusExame.dto.js";
// import { buscarExamesDto } from "../modules/exame/dto/buscarExames.dto.js"; // Removed as it's redundant
import { buscarExamePorIdDto } from "../modules/exame/dto/buscarExamePorId.dto.js";
import { listarExamesDto } from "../modules/exame/dto/listarExames.dto.js";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// Define schemas for nested objects in the response
const PacienteResponseSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  documento: z.string(),
  dataNascimento: z.string().datetime(),
  telefone: z.string(),
  celular: z.string(),
  tipoSanguineo: z.string(),
  whatsapp: z.boolean(),
  status: z.boolean(),
  cep: z.string(),
  logradouro: z.string().nullable(),
  numero: z.string().nullable(),
  bairro: z.string().nullable(),
  complemento: z.string().nullable(),
  cidade: z.string(),
  uf: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).openapi('PacienteResponse');

const ProcedimentoResponseSchema = z.object({
  id: z.string().uuid(),
  sigla: z.string(),
  nome: z.string(),
  cboEspecialidade: z.string(),
  codTuss: z.string().nullable(),
  status: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).openapi('ProcedimentoResponse');

const ExameResponseSchema = z.object({
  id: z.string().cuid(),
  paciente: PacienteResponseSchema,
  procedimento: ProcedimentoResponseSchema,
  idempotencyKey: z.string().uuid(),
  status: z.enum([
    'SOLICITADO', 'AGENDADO', 'EM_ANDAMENTO', 'PROCESSANDO',
    'FINALIZADO', 'CANCELADO', 'ENTREGUE'
  ]),
  createdAt: z.string().datetime(),
}).openapi('ExameResponse');

const ListarExamesResponseSchema = z.object({
  data: z.array(ExameResponseSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
}).openapi('ListarExamesResponse');

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

    summary: "Listar exames paginado",

    description: "Lista paginada de exames com detalhes completos de paciente e procedimento.",

    request: {
      query: listarExamesDto,
    },

    responses: {
      200: {
        description: "Lista paginada de exames",
        description: "Lista paginada de exames com dados completos de paciente e procedimento.",
        content: {
          "application/json": {
            schema: ListarExamesResponseSchema,
          },
        },
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
    path: "/exames/{id}",
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
