import { ExameRepository } from '../repository/exame.repository.js';
import { ExameMapper } from '../mapper/exame.mapper.js';

export class BuscarExamePorIdService {
  async execute(id) {
    const repository = new ExameRepository();
    const exame = await repository.buscarPorId(id);

    if (!exame) {
      throw {
        status: 404,
        message: 'Exame não encontrado',
      };
    }

    return ExameMapper.toResponse(exame);
  }
}
