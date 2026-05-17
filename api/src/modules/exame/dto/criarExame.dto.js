import { z } from 'zod';

export const criarExameDto = z.object({
  pacienteId: z.string().uuid(),
  idProcedimento: z.string().uuid(),
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
