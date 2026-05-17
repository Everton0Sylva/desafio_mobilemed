import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import pacienteRoutes from "./modules/paciente/routes/paciente.routes.js";
import { swaggerSpec } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";
import procedimentoRoutes from "./modules/procedimento/routes/procedimento.routes.js";
import exameRoutes from "./modules/exame/routes/exame.routes.js";

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/pacientes", pacienteRoutes);

app.use("/procedimentos", procedimentoRoutes);

app.use("/exames", exameRoutes);

export default app;
