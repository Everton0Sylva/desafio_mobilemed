import { PacienteRepository }
from '../repository/paciente.repository.js';

export class ListarPacientesService {

  async execute(filters) {

    const repository =
      new PacienteRepository();

    return repository.listar(
      filters
    );
  }
}