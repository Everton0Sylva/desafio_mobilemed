import { ExameRepository } from '../repository/exame.repository.js';
import { ExameMapper } from '../mapper/exame.mapper.js';

export class BuscarExamesService {
  async execute(filters) {
    const repository = new ExameRepository();
    const exames = await repository.buscar(filters);

    return exames.map((exame) => ExameMapper.toResponse(exame));
  }
}
