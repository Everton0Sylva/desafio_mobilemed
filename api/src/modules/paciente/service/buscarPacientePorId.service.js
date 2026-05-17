import { PacienteRepository } from "../repository/paciente.repository.js";

import { PacienteMapper } from "../mapper/paciente.mapper.js";

export class BuscarPacientePorIdService {
  async execute(id) {
    const repository = new PacienteRepository();

    const paciente = await repository.buscarPorId(id);
    

    if (!paciente) {
      throw {
        status: 404,

        message: "Paciente não encontrado",
      };
    }

    return PacienteMapper.toResponse(paciente);
  }
}
