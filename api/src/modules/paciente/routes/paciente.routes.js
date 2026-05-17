import { Router } from "express";

import { BuscarPacientePorIdController } from "../controller/buscarPacientePorId.controller.js";
import { ListarPacientesController } from "../controller/listarPacientes.controller.js";
import { CriarPacienteController } from "../controller/criarPaciente.controller.js";
import { AtualizarPacienteController } from "../controller/atualizarPaciente.controller.js";
import { TrocaStatusPacienteController } from "../controller/trocaStatusPaciente.controller.js";

const router = Router();
const controller = new CriarPacienteController();

const listarPacientesController = new ListarPacientesController();
const criarPacienteController = new CriarPacienteController();

const buscarPacientePorIdController = new BuscarPacientePorIdController();
const atualizarPacienteController = new AtualizarPacienteController();
const trocaStatusPacienteController = new TrocaStatusPacienteController();

router.get("/", listarPacientesController.handle);

router.get("/:id", buscarPacientePorIdController.handle);

router.post("/", (req, res) => criarPacienteController.handle(req, res));

router.put("/:id", (req, res) => atualizarPacienteController.handle(req, res));

router.patch("/:id", (req, res) =>
  trocaStatusPacienteController.handle(req, res),
);

export default router;
