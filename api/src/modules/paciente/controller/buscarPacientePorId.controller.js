import { BuscarPacientePorIdService } from "../service/buscarPacientePorId.service.js";

export class BuscarPacientePorIdController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new BuscarPacientePorIdService();

      const result = await service.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        erro: error.message || "Erro interno",
      });
    }
  }
}
