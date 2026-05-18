import { prisma } from "../../../shared/database/prisma.js";

export class ProcedimentoRepository {
  async criar(data) {
    return prisma.procedimento.create({
      data,
    });
  }

  async listar({ page, pageSize, sigla, cboEspecialidade, codTuss, nome, status }) {
    const skip = (page - 1) * pageSize;

    const where = {};

    if (sigla) {
      where.sigla = sigla;
    }
    if (cboEspecialidade) {
      where.cboEspecialidade = cboEspecialidade;
    }
    if (codTuss) {
      where.codTuss = codTuss;
    }

    if (nome) {
      where.nome = {
        contains: nome,
      };
    }

    if (status !== undefined) {
      where.status = status.toLowerCase().includes("true");
    }

    const data = await prisma.procedimento.findMany({
      where,
      skip,
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
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async buscarPorId(id) {
    return prisma.procedimento.findUnique({
      where: {
        id,
      },
    });
  }

  async atualizar(id, data) {
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
