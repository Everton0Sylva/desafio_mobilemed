import { Router } from "express";

import { BuscarPacientePorIdController } from "../controller/buscarPacientePorId.controller.js";
import { BuscarPacientesController } from "../controller/buscarPacientes.controller.js";
import { CriarPacienteController } from "../controller/criarPaciente.controller.js";
import { AtualizarPacienteController } from "../controller/atualizarPaciente.controller.js";
import { TrocaStatusPacienteController } from "../controller/trocaStatusPaciente.controller.js";

const router = Router();
const controller = new CriarPacienteController();

const buscarPacientesController = new BuscarPacientesController();
const criarPacienteController = new CriarPacienteController();

const buscarPacientePorIdController = new BuscarPacientePorIdController();
const atualizarPacienteController = new AtualizarPacienteController();
const trocaStatusPacienteController = new TrocaStatusPacienteController();

router.post("/", (req, res) => criarPacienteController.handle(req, res));

router.get(
  '/',
  (req, res) =>
    buscarPacientesController
      .handle(req, res)
);

router.get(
  '/listar',
  (req, res) =>
    listarPacientesController
      .handle(req, res)
);

router.get("/:id", (req, res) =>
  buscarPacientePorIdController.handle(req, res),
);


router.put(
  '/:id',
  (req, res) =>
    atualizarPacienteController
      .handle(req, res)
);

router.patch(
  '/:id',
  (req, res) =>
    trocaStatusPacienteController
      .handle(req, res)
);

export default router;
