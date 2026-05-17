-- CreateTable
CREATE TABLE `Procedimento` (
    `id` VARCHAR(191) NOT NULL,
    `sigla` VARCHAR(4) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cboEspecialidade` VARCHAR(191) NOT NULL,
    `codTuss` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Procedimento_nome_idx`(`nome`),
    INDEX `Procedimento_cboEspecialidade_idx`(`cboEspecialidade`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exame` (
    `id` VARCHAR(191) NOT NULL,
    `idPaciente` VARCHAR(191) NOT NULL,
    `idProcedimento` VARCHAR(191) NOT NULL,
    `idempotencyKey` VARCHAR(191) NOT NULL,
    `status` ENUM('SOLICITADO', 'AGENDADO', 'EM_ANDAMENTO', 'PROCESSANDO', 'FINALIZADO', 'CANCELADO', 'ENTREGUE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Exame_idempotencyKey_key`(`idempotencyKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exame` ADD CONSTRAINT `Exame_idPaciente_fkey` FOREIGN KEY (`idPaciente`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exame` ADD CONSTRAINT `Exame_idProcedimento_fkey` FOREIGN KEY (`idProcedimento`) REFERENCES `Procedimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
