import { prisma } from "../../../shared/database/prisma.js";

export class ExameRepository {
  async criar(data) {
    const exameExistente = await prisma.exame.findUnique({
      where: {
        idempotencyKey: data.idempotencyKey,
      },
    });

    if (exameExistente) {
      return { exame: exameExistente, created: false };
    }

    const created = await prisma.exame.create({ data });

    return { exame: created, created: true };
  }

  async buscarPorId(id) {
    return prisma.exame.findUnique({
      where: {
        id,
      },
    });
  }

  async listar({ page, pageSize, idPaciente, idProcedimento, status }) {
    const skip = (page - 1) * pageSize;

    const where = {};

    if (idPaciente) {
      where.idPaciente = idPaciente;
    }

    if (idProcedimento) {
      where.idProcedimento = idProcedimento;
    }

    if (status) {
      where.status = status;
    }

    const data = await prisma.exame.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.exame.count({
      where,
    });

    return {
      data,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async atualizar(id, data) {
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
