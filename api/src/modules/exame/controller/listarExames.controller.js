import { listarExamesDto } from '../dto/listarExames.dto.js';
import { ListarExamesService } from '../service/listarExames.service.js';

export class ListarExamesController {
  async handle(req, res) {
    try {
      const validation = listarExamesDto.safeParse(req.query);

      if (!validation.success) {
        return res.status(400).json({ erro: validation.error.errors });
      }

      const service = new ListarExamesService();
      const result = await service.execute(validation.data.page, validation.data.pageSize);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }
}
