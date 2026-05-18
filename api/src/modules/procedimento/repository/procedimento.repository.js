import { prisma } from "../../../shared/database/prisma.js";

export class ProcedimentoRepository {
  async criar(data) {
    return prisma.procedimento.create({
      data,
    });
  }

  async listar(filters) {
    const skip = (filters.page - 1) * filters.pageSize;

    const where = {};

    if (filters.sigla) {
      where.sigla = filters.sigla;
    }
    if (filters.cboEspecialidade) {
      where.cboEspecialidade = filters.cboEspecialidade;
    }
    if (filters.codTuss) {
      where.codTuss = filters.codTuss;
    }

    if (filters.nome) {
      where.nome = {
        contains: filters.nome,
      };
    }

    if (filters.status !== undefined) {
      where.status = filters.status.toLowerCase().includes("true");
    }

    const data = await prisma.Procedimento.findMany({
      where,

      skip,

      take: filters.pageSize,

      orderBy: {
        nome: "asc",
      },
    });

    const total = await prisma.Procedimento.count({
      where,
    });

    return {
      data,
      page: filters.page,
      pageSize: filters.pageSize,
      total,
      totalPages: Math.ceil(total / filters.pageSize),
    };
  }

  async buscarPorId(id) {
    return prisma.Procedimento.findUnique({
      where: {
        id,
      },
    });
  }

  async atualizar(id, data) {
    return prisma.Procedimento.update({
      where: {
        id,
      },

      data,
    });
  }

  async trocarStatus(id, status) {
    return prisma.Procedimento.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }
}
