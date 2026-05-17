import { buscarExamePorIdDto } from '../dto/buscarExamePorId.dto.js';
import { BuscarExamePorIdService } from '../service/buscarExamePorId.service.js';

export class BuscarExamePorIdController {
  async handle(req, res) {
    try {
      const validation = buscarExamePorIdDto.safeParse(req.params);

      if (!validation.success) {
        return res.status(400).json({ erro: validation.error.errors });
      }

      const service = new BuscarExamePorIdService();
      const result = await service.execute(validation.data.id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ erro: error.message });
    }
  }
}
