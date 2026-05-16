import { Router } from "express";

import { BuscarPacientePorIdController } from "../controller/buscarPacientePorId.controller.js";
import { BuscarPacientesController } from "../controller/buscarPacientes.controller.js";
import { CriarPacienteController } from "../controller/criarPaciente.controller.js";

const router = Router();
const controller = new CriarPacienteController();

const buscarPacientesController = new BuscarPacientesController();
const criarPacienteController = new CriarPacienteController();

const buscarPacientePorIdController = new BuscarPacientePorIdController();

router.post("/", (req, res) => criarPacienteController.handle(req, res));

router.get("/", (req, res) => buscarPacientesController.handle(req, res));

router.get("/:id", (req, res) =>
  buscarPacientePorIdController.handle(req, res),
);

export default router;
