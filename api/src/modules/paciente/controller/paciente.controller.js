import { CriarPacienteService } from "../service/criarPaciente.service.js";
import { criarPacienteDto }
  from '../dto/criarPaciente.dto.js';

export class PacienteController {
  async criar(req, res) {
    try {
      const data = criarPacienteDto.parse(req.body);

      const service = new CriarPacienteService();

      const result = await service.execute(data);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        erro: error.message,
      });
    }
  }
}
