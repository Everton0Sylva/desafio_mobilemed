import { z } from 'zod';

export const criarExameDto = z.object({
  idPaciente: z.string(),
  idProcedimento: z.string(),
  idempotencyKey: z.string().optional(),
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
