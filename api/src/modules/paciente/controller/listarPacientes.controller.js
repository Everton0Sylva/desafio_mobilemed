import {
  listarPacientesDto
}
from '../dto/listarPacientes.dto.js';

import {
  ListarPacientesService
}
from '../service/listarPacientes.service.js';

export class ListarPacientesController {

  async handle(req, res) {

    try {

      const validation =
        listarPacientesDto
          .safeParse(req.query);

      if (!validation.success) {

        return res.status(400).json({

          erro:
            validation.error.errors
        });
      }

      const service =
        new ListarPacientesService();

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