import crypto from "crypto";

export class ExameMapper {
  static toPersistence(data) {
    return {
      pacienteId: data.pacienteId,
      idProcedimento: data.idProcedimento,
      idempotencyKey: crypto.randomUUID(),
      status: data.status ?? "SOLICITADO",
    };
  }

  static toUpdate(data) {
    return {
      ...(data.pacienteId && {
        pacienteId: data.pacienteId,
      }),
      ...(data.idProcedimento && {
        idProcedimento: data.idProcedimento,
      }),
      ...(data.status && {
        status: data.status,
      }),
    };
  }

  static toResponse(data) {
    return {
      id: data.id,
      pacienteId: data.pacienteId,
      idProcedimento: data.idProcedimento,
      idempotencyKey: data.idempotencyKey,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
