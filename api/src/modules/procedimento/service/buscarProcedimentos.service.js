import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class BuscarProcedimentosService {
  async execute(filters) {
    const repository = new ProcedimentoRepository();

    const procedimentos = await repository.buscar(filters);

    return procedimentos.map((procedimento) => {
      const especialidade = EspecialidadeService.buscarPorCbo(
        procedimento.cboEspecialidade,
      );

      return ProcedimentoMapper.toResponse(
        procedimento,

        especialidade,
      );
    });
  }
}
