import { buscarPacientesDto }
  from '../dto/buscarPacientes.dto.js';

import { BuscarPacientesService }
  from '../service/buscarPacientes.service.js';

export class BuscarPacientesController {

  async handle(req, res) {

    try {

      const filters =
        buscarPacientesDto.parse(req.query);

      const service =
        new BuscarPacientesService();

      const result =
        await service.execute(filters);

      return res.status(200).json(result);

    } catch (error) {

      return res.status(400).json({
        erro: error.message
      });

    }
  }
}