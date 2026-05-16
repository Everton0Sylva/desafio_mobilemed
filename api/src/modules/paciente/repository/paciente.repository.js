import { prisma } from "../../../shared/database/prisma.js";

export class PacienteRepository {
  async criar(data) {
    return prisma.paciente.create({
      data,
    });
  }

  async buscar(filters) {

  const {
    nome,
    documento
  } = filters;

  const where = {

    status: true
  };

  if (nome) {

    where.nome = {

      contains: nome
    };
  }

  if (documento) {

    where.documento =
      documento;
  }

  return prisma.paciente.findMany({

    where,

    orderBy: {

      nome: 'asc'
    }
  });
}
async listar(filters) {

  const {
    page,
    pageSize
  } = filters;

  const where = {

    status: true
  };

  const pacientes =
    await prisma.paciente.findMany({

      where,

      skip:
        (page - 1) * pageSize,

      take:
        pageSize,

      orderBy: {

        nome: 'asc'
      }
    });

  const total =
    await prisma.paciente.count({
      where
    });

  return {

    data: pacientes,

    total,

    page,

    pageSize,

    totalPages:
      Math.ceil(
        total / pageSize
      )
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

  async trocarStatus(
  id,
  status
) {

  return prisma.paciente.update({

    where: {
      id
    },

    data: {
      status
    }
  });
}
}
