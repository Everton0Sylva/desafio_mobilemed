import { prisma } from "../../../shared/database/prisma.js";

export class ProcedimentoRepository {
  async criar(data) {
    return prisma.procedimento.create({
      data,
    });
  }

  async buscarPorId(id) {
    return prisma.procedimento.findFirst({
      where: {
        id,

        status: true,
      },
    });
  }

  async buscar(filters) {
    const where = {
      status: true,
    };

    if (filters.nome) {
      where.nome = {
        contains: filters.nome,
      };
    }

    if (filters.sigla) {
      where.sigla = {
        contains: filters.sigla.toUpperCase(),
      };
    }

    if (filters.cboEspecialidade) {
      where.cboEspecialidade = filters.cboEspecialidade;
    }

    if (filters.codTuss) {
      where.codTuss = {
        contains: filters.codTuss,
      };
    }

    return prisma.procedimento.findMany({
      where,

      orderBy: {
        nome: "asc",
      },
    });
  }

  async listar(page, pageSize) {
    const where = {
      status: true,
    };

    const data = await prisma.procedimento.findMany({
      where,

      skip: (page - 1) * pageSize,

      take: pageSize,

      orderBy: {
        nome: "asc",
      },
    });

    const total = await prisma.procedimento.count({
      where,
    });

    return {
      data,

      total,

      page,

      pageSize,

      totalPages: Math.ceil(total / pageSize),
    };
  }

  async alterar(id, data) {
    return prisma.procedimento.update({
      where: {
        id,
      },

      data,
    });
  }

  async trocarStatus(id, status) {
    return prisma.procedimento.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }
}
