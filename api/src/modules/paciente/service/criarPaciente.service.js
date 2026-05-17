import { PacienteRepository } from "../repository/paciente.repository.js";
import { PacienteMapper } from "../mapper/paciente.mapper.js";

export class CriarPacienteService {
  async execute(data) {
    const repository = new PacienteRepository();

    const payload = PacienteMapper.toPersistence(data);

    const paciente = await repository.criar(payload);

    return PacienteMapper.toResponse(paciente);
  }
}
