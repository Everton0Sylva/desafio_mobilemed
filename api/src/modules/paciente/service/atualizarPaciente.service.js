import { PacienteRepository }
from '../repository/paciente.repository.js';

export class AtualizarPacienteService {

  async execute(id, data) {

    const repository =
      new PacienteRepository();

    const paciente =
      await repository.buscarPorId(id);

    if (!paciente) {

      throw {

        status: 404,

        message:
          'Paciente não encontrado'
      };
    }

    return repository.atualizar(
      id,
      data
    );
  }
}