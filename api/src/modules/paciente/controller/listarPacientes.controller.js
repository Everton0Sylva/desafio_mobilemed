import { listarPacientesDto } from "../dto/listarPacientes.dto.js";
import { ListarPacientesService } from "../service/listarPacientes.service.js";

export class ListarPacientesController {
  async handle(req, res) {
    const input = {
      page: req.query.page,

      pageSize: req.query.pageSize,

      documento: req.query.documento,

      nome: req.query.nome,
    };

    if (req.query.status !== undefined) {
      input.status = req.query.status;
    }

    const dto = listarPacientesDto.parse(input);
    const service = new ListarPacientesService();

    const response = await service.execute(dto);

    return res.json(response);
  }
}
