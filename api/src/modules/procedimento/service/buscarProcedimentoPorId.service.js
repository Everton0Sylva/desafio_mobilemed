import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class BuscarProcedimentoPorIdService {
  async execute(id) {
    const repository = new ProcedimentoRepository();

    const procedimento = await repository.buscarPorId(id);

    if (!procedimento) {
      throw {
        status: 404,

        message: "Procedimento não encontrado",
      };
    }

    const especialidade = EspecialidadeService.buscarPorCbo(
      procedimento.cboEspecialidade,
    );

    return ProcedimentoMapper.toResponse(
      procedimento,

      especialidade,
    );
  }
}
