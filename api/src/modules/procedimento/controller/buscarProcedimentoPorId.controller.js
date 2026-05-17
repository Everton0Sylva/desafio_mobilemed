import {
  buscarProcedimentoPorIdDto
}
from '../dto/buscarProcedimentoPorId.dto.js';

import {
  BuscarProcedimentoPorIdService
}
from '../service/buscarProcedimentoPorId.service.js';

export class BuscarProcedimentoPorIdController {

  async handle(req, res) {

    try {

      const validation =
        buscarProcedimentoPorIdDto.safeParse({

          id: req.params.id
        });

      if (!validation.success) {

        return res.status(400).json({

          erro:
            validation.error.errors
        });
      }

      const service =
        new BuscarProcedimentoPorIdService();

      const result =
        await service.execute(
          validation.data.id
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