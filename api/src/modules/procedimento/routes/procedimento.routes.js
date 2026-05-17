import { Router }
from 'express';

import {
  CriarProcedimentoController
}
from '../controller/criarProcedimento.controller.js';

import {
  BuscarProcedimentoPorIdController
}
from '../controller/buscarProcedimentoPorId.controller.js';

import {
  BuscarProcedimentosController
}
from '../controller/buscarProcedimentos.controller.js';

import {
  ListarProcedimentosController
}
from '../controller/listarProcedimentos.controller.js';

import {
  AlterarProcedimentoController
}
from '../controller/alterarProcedimento.controller.js';

import {
  TrocarStatusProcedimentoController
}
from '../controller/trocarStatusProcedimento.controller.js';

const router =
  Router();

const criarProcedimentoController =
  new CriarProcedimentoController();

const buscarProcedimentoPorIdController =
  new BuscarProcedimentoPorIdController();

const buscarProcedimentosController =
  new BuscarProcedimentosController();

const listarProcedimentosController =
  new ListarProcedimentosController();

const alterarProcedimentoController =
  new AlterarProcedimentoController();

const trocarStatusProcedimentoController =
  new TrocarStatusProcedimentoController();

router.post(
  '/',
  (req, res) =>
    criarProcedimentoController
      .handle(req, res)
);

router.get(
  '/',
  (req, res) =>
    buscarProcedimentosController
      .handle(req, res)
);

router.get(
  '/',
  (req, res) =>
    listarProcedimentosController
      .handle(req, res)
);

router.get(
  '/:id',
  (req, res) =>
    buscarProcedimentoPorIdController
      .handle(req, res)
);

router.put(
  '/:id',
  (req, res) =>
    alterarProcedimentoController
      .handle(req, res)
);

router.patch(
  '/:id/status',
  (req, res) =>
    trocarStatusProcedimentoController
      .handle(req, res)
);

export default router;