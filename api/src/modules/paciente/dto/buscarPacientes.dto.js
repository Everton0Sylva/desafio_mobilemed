import { z } from 'zod';

export const buscarPacientesDto = z.object({

  nome: z
    .string()
    .optional(),

  documento: z
    .string()
    .optional(),

  status: z
    .enum(['true', 'false'])
    .optional(),

  page: z
    .string()
    .min(1)
    .default('1'),

  pageSize: z
    .coerce.number()
    .min(1)
    .max(20)
    .default(10)
});