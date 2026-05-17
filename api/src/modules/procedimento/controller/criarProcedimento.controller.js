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
      const data = criarProcedimentoDto.parse(req.body);

      const service = new CriarProcedimentoService();

      const result = await service.execute(data);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        erro: error.message || "Erro interno",
      });
    }
  }
}
