import { Router } from "express";

import { CriarProcedimentoController } from "../controller/criarProcedimento.controller.js";

import { BuscarProcedimentoPorIdController } from "../controller/buscarProcedimentoPorId.controller.js";

import { ListarProcedimentosController } from "../controller/listarProcedimentos.controller.js";

import { AtualizarProcedimentoController } from "../controller/atualizarProcedimento.controller.js";

import { TrocarStatusProcedimentoController } from "../controller/trocarStatusProcedimento.controller.js";

const router = Router();

const criarProcedimentoController = new CriarProcedimentoController();

const buscarProcedimentoPorIdController =
  new BuscarProcedimentoPorIdController();

const listarProcedimentosController = new ListarProcedimentosController();

const atualizarProcedimentoController = new AtualizarProcedimentoController();

const trocarStatusProcedimentoController =
  new TrocarStatusProcedimentoController();

router.get("/", listarProcedimentosController.handle);

router.get("/:id", buscarProcedimentoPorIdController.handle);

router.post("/", (req, res) => criarProcedimentoController.handle(req, res));

router.put("/:id", (req, res) =>
  atualizarProcedimentoController.handle(req, res),
);

router.patch("/:id", (req, res) =>
  trocarStatusProcedimentoController.handle(req, res),
);

export default router;
