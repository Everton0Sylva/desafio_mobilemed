import { z } from "zod";

export const alterarExameDto = z.object({
  idPaciente: z.string().optional(),
  idProcedimento: z.string().optional(),
  status: z
    .enum([
      "SOLICITADO",
      "AGENDADO",
      "EM_ANDAMENTO",
      "PROCESSANDO",
      "FINALIZADO",
      "CANCELADO",
      "ENTREGUE",
    ])
    .optional(),
});
