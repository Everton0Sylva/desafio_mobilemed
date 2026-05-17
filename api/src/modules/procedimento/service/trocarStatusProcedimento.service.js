import { ProcedimentoRepository } from "../repository/procedimento.repository.js";

export class TrocarStatusProcedimentoService {
  async execute(id, status) {
    const repository = new ProcedimentoRepository();

    const procedimento = await repository.buscarPorId(id);

    if (!procedimento) {
      throw {
        status: 404,

        message: "Procedimento não encontrado",
      };
    }

    return repository.trocarStatus(
      id,

      status,
    );
  }
}
