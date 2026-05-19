import { z } from 'zod';

export const alterarExameDto = z.object({
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
