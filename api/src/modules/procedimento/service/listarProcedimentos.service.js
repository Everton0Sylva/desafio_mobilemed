import { EspecialidadeService } from "../../../shared/service/especialidade.service.js";

import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

import { ProcedimentoMapper } from "../mapper/procedimento.mapper.js";

export class ListarProcedimentosService {
  async execute(data) {
    const repository = new ProcedimentoRepository();

    return repository.listar(data);
  }
}
