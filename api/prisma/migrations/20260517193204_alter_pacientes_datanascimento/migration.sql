/*
  Warnings:

  - You are about to drop the column `idPaciente` on the `Exame` table. All the data in the column will be lost.
  - You are about to drop the column `idProcedimento` on the `Exame` table. All the data in the column will be lost.
  - Added the required column `pacienteId` to the `Exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedimentoExameId` to the `Exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Exame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Exame` DROP FOREIGN KEY `Exame_idPaciente_fkey`;

-- DropForeignKey
ALTER TABLE `Exame` DROP FOREIGN KEY `Exame_idProcedimento_fkey`;

-- DropIndex
DROP INDEX `Exame_idPaciente_fkey` ON `Exame`;

-- DropIndex
DROP INDEX `Exame_idProcedimento_fkey` ON `Exame`;

-- AlterTable
ALTER TABLE `Exame` DROP COLUMN `idPaciente`,
    DROP COLUMN `idProcedimento`,
    ADD COLUMN `pacienteId` VARCHAR(191) NOT NULL,
    ADD COLUMN `procedimentoExameId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('SOLICITADO', 'AGENDADO', 'EM_ANDAMENTO', 'PROCESSANDO', 'FINALIZADO', 'CANCELADO', 'ENTREGUE') NOT NULL DEFAULT 'SOLICITADO';

-- AlterTable
ALTER TABLE `Paciente` ADD COLUMN `dataNascimento` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Exame` ADD CONSTRAINT `Exame_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exame` ADD CONSTRAINT `Exame_procedimentoExameId_fkey` FOREIGN KEY (`procedimentoExameId`) REFERENCES `Procedimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
