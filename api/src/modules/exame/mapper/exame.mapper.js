import crypto from "crypto";
import { PacienteMapper } from "../../paciente/mapper/paciente.mapper.js";
import { ProcedimentoMapper } from "../../procedimento/mapper/procedimento.mapper.js";

export class ExameMapper {
  static toPersistence(data) {
    return {
      idPaciente: data.idPaciente,
      idProcedimento: data.idProcedimento,
      idempotencyKey: data.idempotencyKey || crypto.randomUUID(),
      status: data.status ?? "SOLICITADO",
    };
  }

  static toUpdate(data) {
    return {
      ...(data.idPaciente && {
        idPaciente: data.idPaciente,
      }),
      ...(data.idProcedimento && {
        idProcedimento: data.idProcedimento,
      }),
      ...(data.idempotencyKey && {
        idempotencyKey: data.idempotencyKey,
      }),
      ...(data.status && {
        status: data.status,
      }),
    };
  }

  static toResponse(data) {
    return {
      id: data.id,
      paciente: PacienteMapper.toResponse(data.paciente),
      procedimento: ProcedimentoMapper.toResponse(data.procedimento),
      idempotencyKey: data.idempotencyKey,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
