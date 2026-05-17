import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class ListarProcedimentosService {
  async execute(page, pageSize) {
    const repository = new ProcedimentoRepository();

    const result = await repository.listar(page, pageSize);

    return {
      ...result,

      data: result.data.map((procedimento) => {
        const especialidade = EspecialidadeService.buscarPorCbo(
          procedimento.cboEspecialidade,
        );

        return ProcedimentoMapper.toResponse(
          procedimento,

          especialidade,
        );
      }),
    };
  }
}
