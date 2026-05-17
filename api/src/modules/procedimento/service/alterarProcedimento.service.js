import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class AlterarProcedimentoService {
  async execute(id, data) {
    const repository = new ProcedimentoRepository();

    const procedimento = await repository.buscarPorId(id);

    if (!procedimento) {
      throw {
        status: 404,

        message: "Procedimento não encontrado",
      };
    }

    if (data.cboEspecialidade) {
      const exists = EspecialidadeService.existe(data.cboEspecialidade);

      if (!exists) {
        throw {
          status: 400,

          message: "Especialidade inválida",
        };
      }
    }

    const payload = ProcedimentoMapper.toUpdate(data);

    return repository.alterar(
      id,

      payload,
    );
  }
}
