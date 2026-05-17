import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class AtualizarProcedimentoService {

  async execute(id, data) {

    const repository =
      new ProcedimentoRepository();

    const Procedimento =
      await repository.buscarPorId(id);

    if (!Procedimento) {

      throw {

        status: 404,

        message:
          'Procedimento não encontrado'
      };
    }

    return repository.atualizar(
      id,
      data
    );
  }
}