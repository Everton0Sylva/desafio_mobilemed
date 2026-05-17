import {
  buscarProcedimentoPorIdDto
}
from '../dto/buscarProcedimentoPorId.dto.js';

import {
  alterarProcedimentoDto
}
from '../dto/alterarProcedimento.dto.js';

import {
  AlterarProcedimentoService
}
from '../service/alterarProcedimento.service.js';

export class AlterarProcedimentoController {

  async handle(req, res) {

    try {

      const idValidation =
        buscarProcedimentoPorIdDto.safeParse({

          id: req.params.id
        });

      if (!idValidation.success) {

        return res.status(400).json({

          erro:
            idValidation.error.errors
        });
      }

      const bodyValidation =
        alterarProcedimentoDto.safeParse(
          req.body
        );

      if (!bodyValidation.success) {

        return res.status(400).json({

          erro:
            bodyValidation.error.errors
        });
      }

      const service =
        new AlterarProcedimentoService();

      const result =
        await service.execute(

          idValidation.data.id,

          bodyValidation.data
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