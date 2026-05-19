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

    const { idPaciente, idProcedimento, ...rest } = data;

    const created = await prisma.exame.create({
      data: {
        ...rest,
        paciente: { connect: { id: idPaciente } },
        procedimento: { connect: { id: idProcedimento } },
      },
    });

    return { exame: created, created: true };
  }

  async buscarPorId(id) {
    return prisma.exame.findUnique({
      where: {
        id,
      },
      include: {
        paciente: true,
        procedimento: true,
      },
    });
  }

  async listar({ page, pageSize, idPaciente, idProcedimento, status }) {
    const skip = (page - 1) * pageSize;
    const where = {};

    if (idPaciente) where.idPaciente = idPaciente;
    if (idProcedimento) where.idProcedimento = idProcedimento;

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
      include: {
        paciente: true,
        procedimento: true,
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
      include: {
        paciente: true,
        procedimento: true,
      },
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
      include: {
        paciente: true,
        procedimento: true,
      },
    });
  }
}
