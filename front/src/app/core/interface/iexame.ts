import { SituacaoExame } from '../model/situacao-exame.enum';
import { IPaciente } from './ipaciente';
import { IProcedimento } from './iprocedimento';

export interface IExame {
  id: string;
  pacienteId: string;
  idProcedimento: string;
  idempotencyKey: string;
  status: SituacaoExame;
  paciente?: IPaciente;
  procedimento?: IProcedimento;
  createdAt: Date;
  updatedAt: Date;
}