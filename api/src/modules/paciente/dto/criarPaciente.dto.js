import { z } from 'zod';

export const criarPacienteDto = z.object({
  nome: z
    .string()
    .min(5, 'Nome deve possuir ao menos 5 caracteres'),

  documento: z
    .string()
    .min(11, 'CPF inválido')
    .max(14),

  telefone: z
    .string()
    .nullable(),

  celular: z
    .string()
    .trim()
    .regex(/^[0-9]{10,11}$/, 'Telefone inválido'),

  foto: z
    .string()
    .nullable(),

  biometria: z
    .string()
    .nullable()
    .optional(),

  tipoSanguineo: z.enum([
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-'
  ]),

  whatsapp: z
    .boolean()
    .default(false),

  status: z
    .boolean()
    .default(true),

  idEndereco: z
    .string()
    .uuid('Endereço inválido')
});