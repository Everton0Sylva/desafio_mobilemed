import { PacienteRepository }
from '../repository/paciente.repository.js';

export class TrocaStatusPacienteService {

  async execute(id, status) {

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

    return repository.trocarStatus(

      id,

      status
    );
  }
}