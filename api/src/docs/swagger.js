import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { registerPacientePaths } from "./paciente.swagger.js";
import { registerProcedimentoPaths } from "./procedimento.swagger.js";
import { registerExamePaths } from "./exame.swagger.js";

const registry = new OpenAPIRegistry();

registerPacientePaths(registry);
registerProcedimentoPaths(registry);
registerExamePaths(registry);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const swaggerSpec = generator.generateDocument({
  openapi: "3.0.0",

  info: {
    title: "Clínica API",

    version: "1.0.0",
  },

  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
});
