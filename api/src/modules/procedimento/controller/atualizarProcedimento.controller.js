import { buscarProcedimentoPorIdDto } from "../dto/buscarProcedimentoPorId.dto.js";

import { atualizarProcedimentoDto } from "../dto/atualizarProcedimento.dto.js";

import { AtualizarProcedimentoService } from "../service/atualizarProcedimento.service.js";

export class AtualizarProcedimentoController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const validation = atualizarProcedimentoDto.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          erro: validation.error.errors,
        });
      }

      const service = new AtualizarProcedimentoService();

      const result = await service.execute(id, validation.data);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        erro: error.message || "Erro interno",
      });
    }
  }
}
