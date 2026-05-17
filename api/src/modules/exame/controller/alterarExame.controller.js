import { buscarExamePorIdDto } from '../dto/buscarExamePorId.dto.js';
import { alterarExameDto } from '../dto/alterarExame.dto.js';
import { AlterarExameService } from '../service/alterarExame.service.js';

export class AlterarExameController {
  async handle(req, res) {
    try {
      const idValidation = buscarExamePorIdDto.safeParse(req.params);
      if (!idValidation.success) {
        return res.status(400).json({ erro: idValidation.error.errors });
      }

      const bodyValidation = alterarExameDto.safeParse(req.body);
      if (!bodyValidation.success) {
        return res.status(400).json({ erro: bodyValidation.error.errors });
      }

      const service = new AlterarExameService();
      const result = await service.execute(idValidation.data.id, bodyValidation.data);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }
}
