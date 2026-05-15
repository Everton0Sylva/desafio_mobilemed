import { PacienteRepository } from "../repository/paciente.repository.js";

export class CriarPacienteService {
  async execute(data) {
    const repository = new PacienteRepository();

    const pacienteExistente = await repository.buscarPorDocumento(
      data.documento,
    );

    if (pacienteExistente) {
      throw new Error("CPF já cadastrado");
    }

    const payload = PacienteMapper.toPersistence(data);

    const paciente = await repository.criar(payload);

    return PacienteMapper.toResponse(paciente);
  }
}
