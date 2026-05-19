import { PrismaClient, SituacaoExame } from '@prisma/client';
import { randomUUID } from 'crypto';

export async function main(prisma: PrismaClient) {

    const pacientes =
        await prisma.paciente.findMany({
            take: 4,
            orderBy: {
                id: 'asc'
            }
        });

    const procedimentos =
        await prisma.procedimento.findMany({
            take: 4,
            orderBy: {
                id: 'asc'
            }
        });

    if (
        pacientes.length === 0 ||
        procedimentos.length === 0
    ) {

        throw new Error(
            'Necessário seed de pacientes e procedimentos'
        );
    }
    const exames = [];

    const situacoes =
        Object.values(SituacaoExame);

    // Garantir que não tentamos acessar um índice inexistente de pacientes
    const totalParaCriar = Math.min(pacientes.length, procedimentos.length);

    for (let i = 0; i < totalParaCriar; i++) {
        exames.push({
            idPaciente: pacientes[i].id,
            idempotencyKey: randomUUID(),
            idProcedimento: procedimentos[i].id,
            // Garante que pegamos um status válido mesmo se i > situacoes.length
            status: situacoes[i % situacoes.length]
        });
    }

    await prisma.exame.createMany({

        data: exames,

        skipDuplicates: true,

    });

    console.log(
        `${exames.length} exames criados`
    );

}