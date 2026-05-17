import { z } from "zod";

export const criarProcedimentoDto = z.object({
  sigla: z.string().min(3).max(4),

  nome: z.string().min(3),

  cboEspecialidade: z.string(),

  codTuss: z.string().nullable().optional(),
});
