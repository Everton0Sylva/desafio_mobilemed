import {
  buscarProcedimentosDto
}
from '../dto/buscarProcedimentos.dto.js';

import {
  BuscarProcedimentosService
}
from '../service/buscarProcedimentos.service.js';

export class BuscarProcedimentosController {

  async handle(req, res) {

    try {

      const validation =
        buscarProcedimentosDto.safeParse(
          req.query
        );

      if (!validation.success) {

        return res.status(400).json({

          erro:
            validation.error.errors
        });
      }

      const service =
        new BuscarProcedimentosService();

      const result =
        await service.execute(
          validation.data
        );

      return res.status(200).json(
        result
      );

    } catch (error) {

      return res.status(
        error.status || 500
      ).json({

        erro:
          error.message
        });
    }
  }
}