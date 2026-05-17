import { BuscarPacientePorIdService } from "../service/buscarPacientePorId.service.js";

export class BuscarPacientePorIdController {

  async handle(
    req,
    res
  ) {

    const { id } =
      req.params;

    const service =

      new BuscarPacientePorIdService();

    const response =

      await service.execute(id);

    return res.json(
      response
    );
  }
}