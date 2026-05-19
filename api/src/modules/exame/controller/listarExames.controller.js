import { listarExamesDto } from '../dto/listarExames.dto.js';
import { ListarExamesService } from '../service/listarExames.service.js';

export class ListarExamesController {
  async handle(req, res) {
    try {
      const input = {
        page: req.query.page,
        pageSize: req.query.pageSize,
        idPaciente: req.query.idPaciente,
        idProcedimento: req.query.idProcedimento,
      };

      
    if (req.query.status !== undefined) {
      input.status = req.query.status;
    }

      const dto = listarExamesDto.parse(input);

      const service = new ListarExamesService();
      const result = await service.execute(dto);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ 
        erro: error.message || error.errors || "Erro ao listar exames" 
      });
    }
  }
}
