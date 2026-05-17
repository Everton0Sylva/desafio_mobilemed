import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const criarPacienteDto = z.object({
  nome: z.string().openapi({
    example: "Fulano de Tal da Silva",
  }),

  documento: z.string().openapi({
    example: "11122233300",
  }),

  dataNascimento: z.coerce.date().openapi({
    example: "1990-10-01",
  }),

  telefone: z.string().openapi({
    example: "1933333333",
  }),

  celular: z.string().openapi({
    example: "19999876543",
  }),

  foto: z.string().nullable().optional().openapi({
    example:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  }),

  tipoSanguineo: z
    .enum([
      "AP", //  A_POSITIVO
      "AN", //  A_NEGATIVO
      "BP", // B_POSITIVO
      "BN", //B_NEGATIVO
      "ABP", // AB_POSITIVO
      "ABN", //  AB_NEGATIVO
      "OP", //  O_POSITIVO
      "ON", //  O_NEGATIVO
    ])
    .openapi({
      example: "ABN",
    }),

  cep: z.string().optional().openapi({
    example: "12345678",
  }),

  logradouro: z.string().openapi({
    example: "Rua Exemplo",
  }),

  numero: z.string().openapi({
    example: "11",
  }),

  bairro: z.string().openapi({
    example: "Centro",
  }),

  complemento: z.string().optional(),

  cidade: z.string().openapi({
    example: "São Paulo",
  }),

  uf: z.string().length(2).openapi({
    example: "SP",
  }),
});
