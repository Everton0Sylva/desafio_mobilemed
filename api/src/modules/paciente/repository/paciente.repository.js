import { prisma } from '../../../shared/database/prisma.js';

export class PacienteRepository {
  async buscarPorDocumento(documento) {
    return prisma.paciente.findUnique({
      where: {
        documento
      }
    });
  }

  async criar(data) {
    return prisma.paciente.create({
      data
    });
  }
  
  async buscar(filters) {

  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);

  const skip = (page - 1) * limit;

  const where = {};

  if (filters.nome) {
    where.nome = {
      contains: filters.nome
    };
  }

  if (filters.documento) {
    where.documento = filters.documento;
  }

  if (filters.status !== undefined) {
    where.status = filters.status === 'true';
  }

  return prisma.paciente.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      nome: 'asc'
    }
  });
}

async buscarPorId(id) {

  return prisma.paciente.findUnique({

    where: {
      id
    }
  });
}
}