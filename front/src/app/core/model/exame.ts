import { IExame } from '../interface/iexame';
import { SituacaoExame } from './situacao-exame.enum';
import { Paciente } from './paciente';
import { Procedimento } from './procedimento';

export class Exame implements IExame {
  id: string;
  idPaciente: string;
  idProcedimento: string;
  idempotencyKey: string;
  status: SituacaoExame;
  paciente: Paciente;
  procedimento: Procedimento;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any = {}) {
    this.id = data.id ?? data.Id ?? '';
    this.idPaciente = data.idPaciente ?? data.IdPaciente ?? '';
    this.idProcedimento = data.idProcedimento ?? data.IdProcedimento ?? '';
    this.idempotencyKey = data.idempotencyKey ?? data.IdempotencyKey ?? '';

    const statusValue = data.status ?? data.Status;
    this.status = statusValue ? (statusValue as SituacaoExame) : SituacaoExame.SOLICITADO;

    this.paciente = new Paciente(data.paciente ?? data.Paciente);

    this.procedimento = new Procedimento(data.procedimento ?? data.Procedimento);


    this.createdAt = new Date(data.createdAt ?? data.CreatedAt ?? new Date());
    this.updatedAt = new Date(data.updatedAt ?? data.UpdatedAt ?? new Date());
  }
}

export class ExameTable extends Exame {
  pacienteNome: string;
  pacientedocumento: string;
  pacientedataNascimento: string;
  procedimentoSigla: string;

  constructor(data: any = {}) {
    super(data);
    this.pacienteNome = data.pacienteNome ?? data.PacienteNome ?? '';
    this.pacientedocumento = data.pacientedocumento ?? data.Pacientedocumento ?? data.paciente?.documento ?? data.Paciente?.documento ?? '';
    this.pacientedataNascimento = data.pacientedataNascimento ?? data.PacientedataNascimento ?? data.paciente?.dataNascimento ?? data.Paciente?.dataNascimento ?? '';
    this.procedimentoSigla = data.procedimentoSigla ?? data.ProcedimentoSigla ?? data.procedimento?.sigla ?? data.Procedimento?.sigla ?? '';

  }
} 