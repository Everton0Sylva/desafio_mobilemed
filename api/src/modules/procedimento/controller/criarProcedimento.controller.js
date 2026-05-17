import {
  criarProcedimentoDto
}
from '../dto/criarProcedimento.dto.js';

import {
  CriarProcedimentoService
}
from '../service/criarProcedimento.service.js';

export class CriarProcedimentoController {

  async handle(req, res) {

    try {

      const validation =
        criarProcedimentoDto.safeParse(
          req.body
        );

      if (!validation.success) {

        return res.status(400).json({

          erro:
            validation.error.errors
        });
      }

      const service =
        new CriarProcedimentoService();

      const result =
        await service.execute(
          validation.data
        );

      return res.status(201).json(
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