import { Router } from 'express';

import { CriarExameController } from '../controller/criarExame.controller.js';
import { BuscarExamePorIdController } from '../controller/buscarExamePorId.controller.js';
import { ListarExamesController } from '../controller/listarExames.controller.js'; // Keep this
import { AlterarExameController } from '../controller/alterarExame.controller.js';
import { TrocarStatusExameController } from '../controller/trocarStatusExame.controller.js';

const router = Router();

const criarExameController = new CriarExameController();
const buscarExamePorIdController = new BuscarExamePorIdController(); // Keep this
const listarExamesController = new ListarExamesController(); // Keep this
const alterarExameController = new AlterarExameController();
const trocarStatusExameController = new TrocarStatusExameController();

router.post('/', (req, res) => criarExameController.handle(req, res));
router.get('/', listarExamesController.handle);
router.get('/:id', buscarExamePorIdController.handle);
router.put('/:id', (req, res) => alterarExameController.handle(req, res));
router.patch('/:id/status', (req, res) => trocarStatusExameController.handle(req, res));

export default router;
