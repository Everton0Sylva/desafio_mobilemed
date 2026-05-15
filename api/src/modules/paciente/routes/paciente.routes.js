import { Router } from "express";
import { PacienteController } from "../controller/paciente.controller.js";

import { BuscarPacientesController } from "../controller/buscarPacientes.controller.js";

const router = Router();
const controller = new PacienteController();

const buscarController = new BuscarPacientesController();

router.post("/", (req, res) => controller.criar(req, res));

router.get("/", (req, res) => buscarController.execute(req, res));

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags:
 *       - Pacientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               documento:
 *                 type: string
 *               telefone:
 *                 type: string
 *               celular:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 * 
 * 
 *   get:
 *     summary: Pesquisa pacientes
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *       - in: query
 *         name: documento
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de pacientes
 
 */

export default router;
