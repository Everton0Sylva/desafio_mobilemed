import { PrismaClient } from '@prisma/client';

const procedimentos = [
  {
    sigla: "HEMG",
    nome: "Hemograma Completo",
    cboEspecialidade: "225125",
    codTuss: "40304361",
    status: true
  },
  {
    sigla: "GLJC",
    nome: "Glicemia em Jejum",
    cboEspecialidade: "225125",
    codTuss: "40302020",
    status: true
  },
  {
    sigla: "HBGI",
    nome: "Hemoglobina Glicada",
    cboEspecialidade: "225125",
    codTuss: "40302151",
    status: true
  },
  {
    sigla: "CLTR",
    nome: "Colesterol Total",
    cboEspecialidade: "225125",
    codTuss: "40302330",
    status: true
  },
  {
    sigla: "HDL_",
    nome: "HDL",
    cboEspecialidade: "225125",
    codTuss: "40302348",
    status: true
  },
  {
    sigla: "LDL_",
    nome: "LDL",
    cboEspecialidade: "225125",
    codTuss: "40302356",
    status: true
  },
  {
    sigla: "TRIG",
    nome: "Triglicerídeos",
    cboEspecialidade: "225125",
    codTuss: "40302402",
    status: true
  },
  {
    sigla: "CRTN",
    nome: "Creatinina",
    cboEspecialidade: "225125",
    codTuss: "40301680",
    status: true
  },
  {
    sigla: "UREA",
    nome: "Ureia",
    cboEspecialidade: "225125",
    codTuss: "40302526",
    status: true
  },
  {
    sigla: "TGO_",
    nome: "TGO",
    cboEspecialidade: "225125",
    codTuss: "40302470",
    status: true
  },
  {
    sigla: "TGP_",
    nome: "TGP",
    cboEspecialidade: "225125",
    codTuss: "40302488",
    status: true
  },
  {
    sigla: "GGT_",
    nome: "Gama GT",
    cboEspecialidade: "225125",
    codTuss: "40302135",
    status: true
  },
  {
    sigla: "BILT",
    nome: "Bilirrubina Total",
    cboEspecialidade: "225125",
    codTuss: "40301558",
    status: true
  },
  {
    sigla: "TSH_",
    nome: "TSH",
    cboEspecialidade: "225155",
    codTuss: "40316583",
    status: true
  },
  {
    sigla: "T4LV",
    nome: "T4 Livre",
    cboEspecialidade: "225155",
    codTuss: "40316575",
    status: true
  },
  {
    sigla: "VTD_",
    nome: "Vitamina D",
    cboEspecialidade: "225155",
    codTuss: "40316320",
    status: true
  },
  {
    sigla: "B12_",
    nome: "Vitamina B12",
    cboEspecialidade: "225125",
    codTuss: "40316044",
    status: true
  },
  {
    sigla: "FRTN",
    nome: "Ferritina",
    cboEspecialidade: "225125",
    codTuss: "40301876",
    status: true
  },
  {
    sigla: "FERS",
    nome: "Ferro Sérico",
    cboEspecialidade: "225125",
    codTuss: "40301914",
    status: true
  },
  {
    sigla: "PCR_",
    nome: "PCR",
    cboEspecialidade: "225125",
    codTuss: "40302372",
    status: true
  },
  {
    sigla: "GASA",
    nome: "Gasometria Arterial",
    cboEspecialidade: "225124",
    codTuss: "40302119",
    status: true
  },
  {
    sigla: "UR1_",
    nome: "Urina Tipo 1",
    cboEspecialidade: "225125",
    codTuss: "40302500",
    status: true
  },
  {
    sigla: "UROC",
    nome: "Urocultura",
    cboEspecialidade: "225125",
    codTuss: "40308112",
    status: true
  },
  {
    sigla: "PFEZ",
    nome: "Parasitológico de Fezes",
    cboEspecialidade: "225125",
    codTuss: "40307094",
    status: true
  },
  {
    sigla: "PSAT",
    nome: "PSA Total",
    cboEspecialidade: "225285",
    codTuss: "40316192",
    status: true
  },
  {
    sigla: "PSAL",
    nome: "PSA Livre",
    cboEspecialidade: "225285",
    codTuss: "40316184",
    status: true
  },
  {
    sigla: "BHCG",
    nome: "Beta HCG",
    cboEspecialidade: "225250",
    codTuss: "40316079",
    status: true
  },
  {
    sigla: "EKG1",
    nome: "Eletrocardiograma",
    cboEspecialidade: "225120",
    codTuss: "40901130",
    status: true
  },
  {
    sigla: "ECOC",
    nome: "Ecocardiograma",
    cboEspecialidade: "225120",
    codTuss: "40901237",
    status: true
  },
  {
    sigla: "HOLT",
    nome: "Holter 24h",
    cboEspecialidade: "225120",
    codTuss: "40901288",
    status: true
  },
  {
    sigla: "MAPA",
    nome: "MAPA 24h",
    cboEspecialidade: "225120",
    codTuss: "40901300",
    status: true
  },
  {
    sigla: "TEST",
    nome: "Teste Ergométrico",
    cboEspecialidade: "225120",
    codTuss: "40901326",
    status: true
  },
  {
    sigla: "TCCT",
    nome: "Tomografia Computadorizada",
    cboEspecialidade: "225320",
    codTuss: "41001010",
    status: true
  },
  {
    sigla: "RSMG",
    nome: "Ressonância Magnética",
    cboEspecialidade: "225320",
    codTuss: "41101121",
    status: true
  },
  {
    sigla: "USAB",
    nome: "Ultrassonografia Abdominal",
    cboEspecialidade: "225320",
    codTuss: "40901741",
    status: true
  },
  {
    sigla: "USOB",
    nome: "Ultrassonografia Obstétrica",
    cboEspecialidade: "225250",
    codTuss: "40901776",
    status: true
  },
  {
    sigla: "MAMO",
    nome: "Mamografia",
    cboEspecialidade: "225320",
    codTuss: "41001088",
    status: true
  },
  {
    sigla: "RXT_",
    nome: "Raio-X de Tórax",
    cboEspecialidade: "225320",
    codTuss: "41001037",
    status: true
  },
  {
    sigla: "COLN",
    nome: "Colonoscopia",
    cboEspecialidade: "225310",
    codTuss: "40808105",
    status: true
  },
  {
    sigla: "ENDO",
    nome: "Endoscopia Digestiva",
    cboEspecialidade: "225310",
    codTuss: "40808083",
    status: true
  },
  {
    sigla: "DENS",
    nome: "Densitometria Óssea",
    cboEspecialidade: "225136",
    codTuss: "41001100",
    status: true
  },
  {
    sigla: "AUDI",
    nome: "Audiometria",
    cboEspecialidade: "225275",
    codTuss: "40101012",
    status: true
  },
  {
    sigla: "ESPI",
    nome: "Espirometria",
    cboEspecialidade: "225127",
    codTuss: "40102043",
    status: true
  },
  {
    sigla: "EEG_",
    nome: "Eletroencefalograma",
    cboEspecialidade: "225112",
    codTuss: "41101210",
    status: true
  },
  {
    sigla: "ENMG",
    nome: "Eletroneuromiografia",
    cboEspecialidade: "225112",
    codTuss: "41101252",
    status: true
  },
  {
    sigla: "PAHO",
    nome: "Painel Hormonal",
    cboEspecialidade: "225155",
    codTuss: "40316591",
    status: true
  },
  {
    sigla: "PAHE",
    nome: "Painel Hepático",
    cboEspecialidade: "225125",
    codTuss: "40302496",
    status: true
  },
  {
    sigla: "PARE",
    nome: "Painel Renal",
    cboEspecialidade: "225109",
    codTuss: "40302534",
    status: true
  },
  {
    sigla: "COAG",
    nome: "Coagulograma",
    cboEspecialidade: "225185",
    codTuss: "40304124",
    status: true
  },
  {
    sigla: "TIPG",
    nome: "Tipagem Sanguínea",
    cboEspecialidade: "225125",
    codTuss: "40304388",
    status: true
  }
];

export async function main(prisma: PrismaClient) {
  await prisma.procedimento.createMany({
    data: procedimentos,
    skipDuplicates: true
  });

  console.log(`Seed: ${procedimentos.length} procedimentos processados`);
}
