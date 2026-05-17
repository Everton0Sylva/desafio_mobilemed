import { ExameRepository } from '../repository/exame.repository.js';
import { ExameMapper } from '../mapper/exame.mapper.js';

export class TrocarStatusExameService {
  async execute(id, status) {
    const repository = new ExameRepository();
    const exame = await repository.buscarPorId(id);

    if (!exame) {
      throw {
        status: 404,
        message: 'Exame não encontrado',
      };
    }

    const updatedExame = await repository.trocarStatus(id, status);

    return ExameMapper.toResponse(updatedExame);
  }
}
