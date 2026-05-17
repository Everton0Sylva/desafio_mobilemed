import {
  listarProcedimentosDto
}
from '../dto/listarProcedimentos.dto.js';

import {
  ListarProcedimentosService
}
from '../service/listarProcedimentos.service.js';

export class ListarProcedimentosController {

  async handle(req, res) {

    try {

      const validation =
        listarProcedimentosDto.safeParse(
          req.query
        );

      if (!validation.success) {

        return res.status(400).json({

          erro:
            validation.error.errors
        });
      }

      const service =
        new ListarProcedimentosService();

      const result =
        await service.execute(

          validation.data.page,

          validation.data.pageSize
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