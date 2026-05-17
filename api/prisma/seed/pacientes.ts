import { PrismaClient, TipoSanguineo } from '@prisma/client';

const prisma = new PrismaClient();

const pacientes = [
  {
    nome: 'João Silva',
    documento: '11111111111',
    telefone: '1933333333',
    celular: '19999999991',
    dataNascimento: new Date('1985-05-10'),
    tipoSanguineo: TipoSanguineo.OP,
    whatsapp: true,
    status: true,
    logradouro: 'Rua A',
    numero: '100',
    bairro: 'Centro',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13010000',
  },
  {
    nome: 'Maria Oliveira',
    documento: '22222222222',
    telefone: '1933333334',
    celular: '19999999992',
    dataNascimento: new Date('1992-08-15'),
    tipoSanguineo: TipoSanguineo.AP,
    whatsapp: true,
    status: true,
    logradouro: 'Rua B',
    numero: '101',
    bairro: 'Taquaral',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13020000',
  },
  {
    nome: 'Carlos Souza',
    documento: '33333333333',
    telefone: '1933333335',
    celular: '19999999993',
    dataNascimento: new Date('1978-01-20'),
    tipoSanguineo: TipoSanguineo.BP,
    whatsapp: false,
    status: true,
    logradouro: 'Rua C',
    numero: '102',
    bairro: 'Barão Geraldo',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13030000',
  },
  {
    nome: 'Fernanda Lima',
    documento: '44444444444',
    telefone: '1933333336',
    celular: '19999999994',
    dataNascimento: new Date('1989-11-05'),
    tipoSanguineo: TipoSanguineo.ON,
    whatsapp: true,
    status: true,
    logradouro: 'Rua D',
    numero: '103',
    bairro: 'Cambuí',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13040000',
  },
  {
    nome: 'Ricardo Alves',
    documento: '55555555555',
    telefone: '1933333337',
    celular: '19999999995',
    dataNascimento: new Date('1995-03-18'),
    tipoSanguineo: TipoSanguineo.ABN,
    whatsapp: true,
    status: true,
    logradouro: 'Rua E',
    numero: '104',
    bairro: 'Swift',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13050000',
  },
  {
    nome: 'Patrícia Gomes',
    documento: '66666666666',
    telefone: '1933333338',
    celular: '19999999996',
    dataNascimento: new Date('1980-09-12'),
    tipoSanguineo: TipoSanguineo.BN,
    whatsapp: false,
    status: true,
    logradouro: 'Rua F',
    numero: '105',
    bairro: 'Bonfim',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13060000',
  },
  {
    nome: 'Eduardo Martins',
    documento: '77777777777',
    telefone: '1933333339',
    celular: '19999999997',
    dataNascimento: new Date('1970-07-01'),
    tipoSanguineo: TipoSanguineo.OP,
    whatsapp: true,
    status: true,
    logradouro: 'Rua G',
    numero: '106',
    bairro: 'Chapadão',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13070000',
  },
  {
    nome: 'Juliana Rocha',
    documento: '88888888888',
    telefone: '1933333340',
    celular: '19999999998',
    dataNascimento: new Date('1999-12-30'),
    tipoSanguineo: TipoSanguineo.AP,
    whatsapp: true,
    status: true,
    logradouro: 'Rua H',
    numero: '107',
    bairro: 'Ouro Verde',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13080000',
  },

  // menores de idade

  {
    nome: 'Lucas Ferreira',
    documento: '99999999999',
    telefone: '1933333341',
    celular: '19999999999',
    dataNascimento: new Date('2010-04-15'),
    tipoSanguineo: TipoSanguineo.OP,
    whatsapp: false,
    status: true,
    logradouro: 'Rua I',
    numero: '108',
    bairro: 'Centro',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13090000',
  },
  {
    nome: 'Ana Beatriz',
    documento: '10101010101',
    telefone: '1933333342',
    celular: '19999999990',
    dataNascimento: new Date('2012-09-21'),
    tipoSanguineo: TipoSanguineo.ABP,
    whatsapp: false,
    status: true,
    logradouro: 'Rua J',
    numero: '109',
    bairro: 'Taquaral',
    complemento: '',
    cidade: 'Campinas',
    uf: 'SP',
    cep: '13100000',
  },
];

async function main() {

  await prisma.paciente.createMany({

    data: pacientes,

    skipDuplicates: true,
  });

  console.log(
    `${pacientes.length} pacientes processados`
  );
}

main()
  .catch((e) => {

    console.error(e);

    process.exit(1);
  })

  .finally(async () => {

    await prisma.$disconnect();
  });