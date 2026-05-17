import crypto from 'crypto';

export class ProcedimentoMapper {

  static toPersistence(data) {

    return {

      sigla:
        data.sigla
          .toUpperCase(),

      nome:
        data.nome,

      cboEspecialidade:
        data.cboEspecialidade,

      codTuss:
        data.codTuss,

      idempotencyKey:
        crypto.randomUUID(),

      status: true
    };
  }

  static toUpdate(data) {

    return {

      ...(data.sigla && {

        sigla:
          data.sigla.toUpperCase()
      }),

      ...(data.nome && {

        nome:
          data.nome
      }),

      ...(data.cboEspecialidade && {

        cboEspecialidade:
          data.cboEspecialidade
      }),

      ...(data.codTuss !== undefined && {

        codTuss:
          data.codTuss
      })
    };
  }

  static toResponse(
    data,
    especialidade
  ) {

    return {

      id:
        data.id,

      sigla:
        data.sigla,

      nome:
        data.nome,

      codTuss:
        data.codTuss,

      status:
        data.status,

      especialidade,

      createdAt:
        data.createdAt,

      updatedAt:
        data.updatedAt
    };
  }
}