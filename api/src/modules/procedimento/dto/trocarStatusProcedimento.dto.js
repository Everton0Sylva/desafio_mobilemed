import { z } from "zod";

export const trocarStatusProcedimentoDto = z.object({
  status: z.boolean(),
});
