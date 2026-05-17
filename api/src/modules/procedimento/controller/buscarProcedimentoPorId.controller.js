import {
  buscarProcedimentoPorIdDto
}
from '../dto/buscarProcedimentoPorId.dto.js';

import {
  BuscarProcedimentoPorIdService
}
from '../service/buscarProcedimentoPorId.service.js';

export class BuscarProcedimentoPorIdController {

  async handle(
    req,
    res
  ) {

    const { id } =
      req.params;

    const service =

      new BuscarProcedimentoPorIdService();

    const response =

      await service.execute(id);

    return res.json(
      response
    );
  }
}