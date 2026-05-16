import { z } from "zod";

export const buscarPacientesDto =
  z.object({

    nome:
      z.string()
        .optional(),

    documento:
      z.string()
        .optional()
  });