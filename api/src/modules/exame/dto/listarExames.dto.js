import { z } from 'zod';

export const listarExamesDto = z.object({
    page:
      z.coerce.number()
        .min(1)
        .default(1),

    pageSize:
      z.coerce.number()
        .min(1)
        .max(100)
        .default(10),
  idPaciente: z.string().uuid().optional(),
  idProcedimento: z.string().uuid().optional(),
  status: z.enum([
    'SOLICITADO',
    'AGENDADO',
    'EM_ANDAMENTO',
    'PROCESSANDO',
    'FINALIZADO',
    'CANCELADO',
    'ENTREGUE',
  ]).optional(),
});