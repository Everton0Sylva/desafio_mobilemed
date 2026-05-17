import { z } from 'zod';

export const trocarStatusExameDto = z.object({
  status: z.enum([
    'SOLICITADO',
    'AGENDADO',
    'EM_ANDAMENTO',
    'PROCESSANDO',
    'FINALIZADO',
    'CANCELADO',
    'ENTREGUE',
  ]),
});
