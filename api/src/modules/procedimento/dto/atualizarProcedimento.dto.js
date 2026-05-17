import { z } from "zod";

export const atualizarProcedimentoDto =
  z.object({

    sigla:
      z.string()
        .min(3)
        .max(4)
        .optional(),

    nome:
      z.string()
        .min(3)
        .optional(),

    cboEspecialidade:
      z.string()
        .optional(),

    codTuss:
      z.string()
        .nullable()
        .optional()
  });