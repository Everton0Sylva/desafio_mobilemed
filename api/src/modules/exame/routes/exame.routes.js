import { Router } from 'express';

import { CriarExameController } from '../controller/criarExame.controller.js';
import { BuscarExamePorIdController } from '../controller/buscarExamePorId.controller.js';
import { BuscarExamesController } from '../controller/buscarExames.controller.js';
import { ListarExamesController } from '../controller/listarExames.controller.js';
import { AlterarExameController } from '../controller/alterarExame.controller.js';
import { TrocarStatusExameController } from '../controller/trocarStatusExame.controller.js';

const router = Router();

const criarExameController = new CriarExameController();
const buscarExamePorIdController = new BuscarExamePorIdController();
const buscarExamesController = new BuscarExamesController();
const listarExamesController = new ListarExamesController();
const alterarExameController = new AlterarExameController();
const trocarStatusExameController = new TrocarStatusExameController();

router.post('/', (req, res) => criarExameController.handle(req, res));
router.get('/', (req, res) => buscarExamesController.handle(req, res));
router.get('/', (req, res) => listarExamesController.handle(req, res));
router.get('/:id', (req, res) => buscarExamePorIdController.handle(req, res));
router.put('/:id', (req, res) => alterarExameController.handle(req, res));
router.patch('/:id/status', (req, res) => trocarStatusExameController.handle(req, res));

export default router;
