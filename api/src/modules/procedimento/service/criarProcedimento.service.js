import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class CriarProcedimentoService {
  async execute(data) {
    const repository = new ProcedimentoRepository();

    const payload = ProcedimentoMapper.toPersistence(data);

    const procedimento = await repository.criar(payload);

    return ProcedimentoMapper.toResponse(procedimento);
  }
}
