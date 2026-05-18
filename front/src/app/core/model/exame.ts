import { IExame } from '../interface/iexame';
import { SituacaoExame } from './situacao-exame.enum';
import { Paciente } from './paciente';
import { Procedimento } from './procedimento';

export class Exame implements IExame {
  id: string;
  pacienteId: string;
  idProcedimento: string;
  idempotencyKey: string;
  status: SituacaoExame;
  paciente?: Paciente;
  procedimento?: Procedimento;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any = {}) {
    this.id = data.id ?? data.Id ?? '';
    this.pacienteId = data.pacienteId ?? data.PacienteId ?? '';
    this.idProcedimento = data.idProcedimento ?? data.IdProcedimento ?? data.procedimentoExameId ?? data.ProcedimentoExameId ?? '';
    this.idempotencyKey = data.idempotencyKey ?? data.IdempotencyKey ?? '';

    // Mapeamento do Status com fallback para o default do Prisma (SOLICITADO)
    const statusValue = data.status ?? data.Status;
    this.status = statusValue ? (statusValue as SituacaoExame) : SituacaoExame.SOLICITADO;

    // Instanciação opcional da relação de Paciente, similar ao comportamento do Prisma include
    if (data.paciente || data.Paciente) {
      this.paciente = new Paciente(data.paciente ?? data.Paciente);
    }

    // Instanciação da relação de Procedimento
    if (data.procedimento || data.Procedimento) {
      this.procedimento = new Procedimento(data.procedimento ?? data.Procedimento);
    }

    this.createdAt = new Date(data.createdAt ?? data.CreatedAt ?? new Date());
    this.updatedAt = new Date(data.updatedAt ?? data.UpdatedAt ?? new Date());
  }
}