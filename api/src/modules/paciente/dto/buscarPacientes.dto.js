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
    .optional()
    .default('1'),

  limit: z
    .string()
    .optional()
    .default('10')
});