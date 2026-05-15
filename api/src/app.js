import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import pacienteRoutes from './modules/paciente/routes/paciente.routes.js';
import { swaggerSpec } from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/pacientes', pacienteRoutes);

export default app;