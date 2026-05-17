import { PacienteRepository } from "../repository/paciente.repository.js";

export class ListarPacientesService {
  async execute(data) {
    const repository = new PacienteRepository();

    return repository.listar(data);
  }
}
