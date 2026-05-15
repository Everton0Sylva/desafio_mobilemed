import { PacienteRepository }
  from '../repository/paciente.repository.js';

import { PacienteMapper }
  from '../mapper/paciente.mapper.js';

export class BuscarPacientesService {

  async execute(filters) {

    const repository =
      new PacienteRepository();

    const pacientes =
      await repository.buscar(filters);

    return pacientes.map(
      PacienteMapper.toResponse
    );
  }
}