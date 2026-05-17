import { prisma } from "../../../shared/database/prisma.js";

export class ExameRepository {
  async criar(data) {
    const exameExistente = await prisma.exame.findUnique({
      where: {
        idempotencyKey: data.idempotencyKey,
      },
    });

    if (exameExistente) {
      return exameExistente;
    }

    return prisma.exame.create({
      data,
    });
  }

  async buscarPorId(id) {
    return prisma.exame.findUnique({
      where: {
        id,
      },
    });
  }

  async buscar(filters) {
    const where = {};

    if (filters.pacienteId) {
      where.pacienteId = filters.pacienteId;
    }

    if (filters.idProcedimento) {
      where.idProcedimento = filters.idProcedimento;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return prisma.exame.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async listar(page, pageSize) {
    const data = await prisma.exame.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.exame.count({});

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async alterar(id, data) {
    return prisma.exame.update({
      where: {
        id,
      },
      data,
    });
  }

  async trocarStatus(id, status) {
    return prisma.exame.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
