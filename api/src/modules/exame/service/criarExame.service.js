export class CriarExameService {

  async execute(data) {

    const pacienteRepository =
      new PacienteRepository();

    const paciente =

      await pacienteRepository.buscarPorId(

        data.pacienteId
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

    const repository =
      new ExameRepository();

    const payload =

      ExameMapper.toPersistence(
        data
      );

    const exame =

      await repository.criar(
        payload
      );

    return ExameMapper.toResponse(
      exame
    );
  }
}