import { PrismaClient } from '@prisma/client';


import { main as seedProcedimentos } from './seed/procedimentos.ts';
import { main as seedPacientes } from './seed/pacientes.ts';
import { main as seedExames } from './seed/exames.ts';

const prisma = new PrismaClient();


async function main() {
    
    console.log('-> Gerando Pacientes...');
    await seedPacientes(prisma);

    console.log('-> Gerando Procedimentos...');
    await seedProcedimentos(prisma);

    console.log('-> Gerando Exames...');
    await seedExames(prisma);

    console.log('Seeds executados com sucesso!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Erro ao rodar os seeds:', e);
        await prisma.$disconnect();
        process.exit(1);
    });