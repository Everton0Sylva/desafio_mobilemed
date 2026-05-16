-- CreateTable
CREATE TABLE `Paciente` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `biometria` VARCHAR(191) NULL,
    `tipoSanguineo` ENUM('AP', 'AN', 'BP', 'BN', 'ABP', 'ABN', 'OP', 'ON') NOT NULL,
    `whatsapp` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Paciente_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
