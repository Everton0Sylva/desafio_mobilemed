import { z } from "zod";

export const buscarProcedimentosDto =
  z.object({

    nome:
      z.string()
        .optional(),

    sigla:
      z.string()
        .optional(),

    cboEspecialidade:
      z.string()
        .optional(),

    codTuss:
      z.string()
        .optional()
  });