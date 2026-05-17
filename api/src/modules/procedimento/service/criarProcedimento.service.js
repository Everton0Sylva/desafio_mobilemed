import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class CriarProcedimentoService {
  async execute(data) {
    const exists = EspecialidadeService.existe(data.cboEspecialidade);

    if (!exists) {
      throw {
        status: 400,

        message: "Especialidade inválida",
      };
    }

    const repository = new ProcedimentoRepository();

    const payload = ProcedimentoMapper.toPersistence(data);

    const procedimento = await repository.criar(payload);

    const especialidade = EspecialidadeService.buscarPorCbo(
      procedimento.cboEspecialidade,
    );

    return ProcedimentoMapper.toResponse(
      procedimento,

      especialidade,
    );
  }
}
