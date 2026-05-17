import { buscarProcedimentoPorIdDto } from "../dto/buscarProcedimentoPorId.dto.js";

import { trocarStatusProcedimentoDto } from "../dto/trocarStatusProcedimento.dto.js";

import { TrocarStatusProcedimentoService } from "../service/trocarStatusProcedimento.service.js";

export class TrocarStatusProcedimentoController {
  async handle(req, res) {
    try {
      const idValidation = buscarProcedimentoPorIdDto.safeParse({
        id: req.params.id,
      });

      if (!idValidation.success) {
        return res.status(400).json({
          erro: idValidation.error.errors,
        });
      }

      const bodyValidation = trocarStatusProcedimentoDto.safeParse(req.body);

      if (!bodyValidation.success) {
        return res.status(400).json({
          erro: bodyValidation.error.errors,
        });
      }

      const service = new TrocarStatusProcedimentoService();

      const result = await service.execute(
        idValidation.data.id,

        bodyValidation.data.status,
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        erro: error.message,
      });
    }
  }
}
