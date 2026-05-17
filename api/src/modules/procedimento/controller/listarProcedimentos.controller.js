import { listarProcedimentosDto } from "../dto/listarProcedimentos.dto.js";

import { ListarProcedimentosService } from "../service/listarProcedimentos.service.js";

export class ListarProcedimentosController {
  async handle(req, res) {
    const dto = listarProcedimentosDto.parse({
      page: req.query.page,

      pageSize: req.query.pageSize,

      cboEspecialidade: req.query.cboEspecialidade,

      codTuss: req.query.codTuss,

      nome: req.query.nome,

      status: req.query.status,
    });

    const service = new ListarProcedimentosService();

    const response = await service.execute(dto);

    return res.json(response);
  }
}
