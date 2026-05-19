import { z } from 'zod';

export const buscarExamePorIdDto = z.object({
  id: z.string(),
});
