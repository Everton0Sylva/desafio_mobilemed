import {
  trocaStatusPacienteDto
}
from '../dto/trocaStatusPaciente.dto.js';

import {
  TrocaStatusPacienteService
}
from '../service/trocaStatusPaciente.service.js';

export class TrocaStatusPacienteController {

  async handle(req, res) {

    try {

      const { id } =
        req.params;

      const validation =
       trocaStatusPacienteDto
          .safeParse(req.body);

      if (!validation.success) {

        return res.status(400).json({

          erro:
            validation.error.errors
        });
      }

      const service =
        new TrocaStatusPacienteService();

      const result =
        await service.execute(

          id,

          validation.data.status
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