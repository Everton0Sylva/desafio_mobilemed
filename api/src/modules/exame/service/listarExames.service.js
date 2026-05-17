import { ExameRepository } from '../repository/exame.repository.js';
import { ExameMapper } from '../mapper/exame.mapper.js';

export class ListarExamesService {
  async execute(page, pageSize) {
    const repository = new ExameRepository();
    const result = await repository.listar(page, pageSize);

    return {
      ...result,
      data: result.data.map((exame) => ExameMapper.toResponse(exame)),
    };
  }
}
