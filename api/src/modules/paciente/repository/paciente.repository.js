import { prisma } from "../../../shared/database/prisma.js";

export class PacienteRepository {
  async criar(data) {
    const pacienteExistente = await prisma.paciente.findUnique({
      where: {
        documento: data.documento,
      },
    });

    if (pacienteExistente) {
      throw {
        status: 409,

        message: "Paciente já cadastrado",
      };
    }

    return prisma.paciente.create({
      data,
    });
  }

  async listar({ page, pageSize, documento, nome, status }) {
    const skip = (page - 1) * pageSize;

    const where = {};

    if (documento) {
      where.documento = {
        contains: documento,
      };
    }

    if (nome) {
      where.nome = {
        contains: nome
      };
    }

    if (status !== undefined) {
      where.status = status.toLowerCase().includes("true");
    }

    const data = await prisma.paciente.findMany({
      where,

      skip,

      take: pageSize,

      orderBy: {
        nome: "asc",
      },
    });

    const total = await prisma.paciente.count({
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

  async buscarPorId(id) {
    return prisma.paciente.findUnique({
      where: {
        id,
      },
    });
  }

  async atualizar(id, data) {
    return prisma.paciente.update({
      where: {
        id,
      },

      data,
    });
  }

  async trocarStatus(id, status) {
    return prisma.paciente.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }
}
