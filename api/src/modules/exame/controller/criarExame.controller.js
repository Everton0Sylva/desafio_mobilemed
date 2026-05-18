import { criarExameDto } from '../dto/criarExame.dto.js';
import { CriarExameService } from '../service/criarExame.service.js';

export class CriarExameController {
  async handle(req, res) {
    try {
      const validation = criarExameDto.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ erro: validation.error.errors });
      }

      const service = new CriarExameService();
      const result = await service.execute(validation.data);

      if (result.created === false) {
        return res.status(200).json(result.exame);
      }

      return res.status(201).json(result.exame);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }
}
