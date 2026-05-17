import { buscarExamePorIdDto } from '../dto/buscarExamePorId.dto.js';
import { trocarStatusExameDto } from '../dto/trocarStatusExame.dto.js';
import { TrocarStatusExameService } from '../service/trocarStatusExame.service.js';

export class TrocarStatusExameController {
  async handle(req, res) {
    try {
      const idValidation = buscarExamePorIdDto.safeParse(req.params);
      if (!idValidation.success) {
        return res.status(400).json({ erro: idValidation.error.errors });
      }

      const bodyValidation = trocarStatusExameDto.safeParse(req.body);
      if (!bodyValidation.success) {
        return res.status(400).json({ erro: bodyValidation.error.errors });
      }

      const service = new TrocarStatusExameService();
      const result = await service.execute(idValidation.data.id, bodyValidation.data.status);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }
}
