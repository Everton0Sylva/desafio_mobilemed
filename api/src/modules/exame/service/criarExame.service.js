import { PacienteRepository } from '../../paciente/repository/paciente.repository.js';
import { ProcedimentoRepository } from '../../procedimento/repository/procedimento.repository.js';
import { ExameRepository } from '../repository/exame.repository.js';
import { ExameMapper } from '../mapper/exame.mapper.js';

export class CriarExameService {

  async execute(data) {

    const pacienteRepository = new PacienteRepository();

    const paciente =
      await pacienteRepository.buscarPorId(
        data.idPaciente
      );

    if (!paciente) {

      throw {

        status: 400,

        message:
          'Paciente não encontrado'
      };
    }

    const procedimentoRepository =
      new ProcedimentoRepository();

    const procedimento =

      await procedimentoRepository.buscarPorId(

        data.idProcedimento
      );

    if (!procedimento) {

      throw {

        status: 400,

        message:
          'Procedimento não encontrado'
      };
    }

    const repository = new ExameRepository();

    const payload = ExameMapper.toPersistence(data);

    const { exame, created } = await repository.criar(payload);

    return { exame: ExameMapper.toResponse(exame), created };
  }
}