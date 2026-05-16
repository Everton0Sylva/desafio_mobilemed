import { buscarPacientesDto } from "../dto/buscarPacientes.dto.js";

import { BuscarPacientesService } from "../service/buscarPacientes.service.js";

export class BuscarPacientesController {
  async handle(req, res) {
    try {
      const validation = buscarPacientesDto.safeParse(req.query);

      if (!validation.success) {
        return res.status(400).json({
          erro: validation.error.errors,
        });
      }

      const service = new BuscarPacientesService();

      const result = await service.execute(validation.data);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        erro: error.message,
      });
    }
  }
}
