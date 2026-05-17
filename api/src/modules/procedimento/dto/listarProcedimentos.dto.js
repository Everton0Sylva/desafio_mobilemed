import { z } from "zod";

export const listarProcedimentosDto = z.object({
  page: z.coerce.number().min(1).default(1),

  pageSize: z.coerce.number().min(1).max(100).default(10),

  codTuss: z.string().optional(),
  cboEspecialidade: z.string().optional(),

  nome: z.string().optional(),
  status: z.enum(["true", "false"]).optional(),
});
