import { z } from "zod";

export const buscarProcedimentoPorIdDto =
  z.object({

    id:
      z.string()
        .uuid()
  });