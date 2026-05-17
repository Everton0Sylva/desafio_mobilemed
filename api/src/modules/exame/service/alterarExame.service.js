import { ExameRepository } from '../repository/exame.repository.js';
import { ExameMapper } from '../mapper/exame.mapper.js';

export class AlterarExameService {
  async execute(id, data) {
    const repository = new ExameRepository();
    const exame = await repository.buscarPorId(id);

    if (!exame) {
      throw {
        status: 404,
        message: 'Exame não encontrado',
      };
    }

    const payload = ExameMapper.toUpdate(data);
    const updatedExame = await repository.alterar(id, payload);

    return ExameMapper.toResponse(updatedExame);
  }
}
