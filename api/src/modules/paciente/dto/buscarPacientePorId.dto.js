import { z } from "zod";

export const buscarPacientePorIdDto = z.object({
  id: z.string(),
});
