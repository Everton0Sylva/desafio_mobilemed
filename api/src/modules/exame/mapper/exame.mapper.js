import crypto from "crypto";

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
      ...(data.status && {
        status: data.status,
      }),
    };
  }

  static toResponse(data) {
    return {
      id: data.id,
      idPaciente: data.idPaciente,
      idProcedimento: data.idProcedimento,
      idempotencyKey: data.idempotencyKey,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
