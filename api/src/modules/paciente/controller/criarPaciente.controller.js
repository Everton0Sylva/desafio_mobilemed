import { CriarPacienteService } from "../service/criarPaciente.service.js";
import { criarPacienteDto } from "../dto/criarPaciente.dto.js";

export class CriarPacienteController {
  async handle(req, res) {
    try {
      const data = criarPacienteDto.parse(req.body);

      const service = new CriarPacienteService();

      const result = await service.execute(data);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        erro: error.message || "Erro interno",
      });
    }
  }
}
