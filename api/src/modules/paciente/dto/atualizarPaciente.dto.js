import { z } from "zod";

export const atualizarPacienteDto = z
  .object({
    nome: z.string()
    .optional(),

    documento: z.string()
    .optional(),

    dataNascimento: z.coerce.date().optional(),

    telefone: z.string().optional(),

    celular: z.string().optional(),

    foto: z.string().nullable().optional(),

    biometria: z.string().nullable().optional(),

    tipoSanguineo: z.enum(["OP", "ON", "AP", "AN", "BP", "BN", "ABP", "ABN"])
    .optional(),

    cep: z.string().optional(),

    whatsapp: z.boolean().optional(),

    logradouro: z.string(),

    numero: z.string(),

    bairro: z.string(),

    complemento: z.string().optional(),

    cidade: z.string(),

    uf: z.string(),
  })
  .openapi("AtualizarPacienteDto");
