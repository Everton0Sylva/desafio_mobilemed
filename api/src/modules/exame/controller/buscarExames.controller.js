import { buscarExamesDto } from '../dto/buscarExames.dto.js';
import { BuscarExamesService } from '../service/buscarExames.service.js';

export class BuscarExamesController {
  async handle(req, res) {
    try {
      const validation = buscarExamesDto.safeParse(req.query);

      if (!validation.success) {
        return res.status(400).json({ erro: validation.error.errors });
      }

      const service = new BuscarExamesService();
      const result = await service.execute(validation.data);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }
}
