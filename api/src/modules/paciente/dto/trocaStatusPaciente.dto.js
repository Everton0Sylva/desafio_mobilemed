import { z } from "zod";

export const trocaStatusPacienteDto = z.object({
  status: z.boolean(),
});
