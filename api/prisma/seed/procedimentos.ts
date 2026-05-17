import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const procedimentos = [
  { sigla: "HEMG", nome: "Hemograma Completo", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "GLJC", nome: "Glicemia em Jejum", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "HBGI", nome: "Hemoglobina Glicada", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "CLTR", nome: "Colesterol Total", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "HDL_", nome: "HDL", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "LDL_", nome: "LDL", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "TRIG", nome: "Triglicerídeos", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "CRTN", nome: "Creatinina", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "UREA", nome: "Ureia", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "TGO_", nome: "TGO", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "TGP_", nome: "TGP", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "GGT_", nome: "Gama GT", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "BILT", nome: "Bilirrubina Total", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "TSH_", nome: "TSH", cboEspecialidade: "225155", codTuss: "5059", status: true },
  { sigla: "T4LV", nome: "T4 Livre", cboEspecialidade: "225155", codTuss: "5059", status: true },
  { sigla: "VTD_", nome: "Vitamina D", cboEspecialidade: "225155", codTuss: "5059", status: true },
  { sigla: "B12_", nome: "Vitamina B12", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "FRTN", nome: "Ferritina", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "FERS", nome: "Ferro Sérico", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "PCR_", nome: "PCR", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "GASA", nome: "Gasometria Arterial", cboEspecialidade: "225150", codTuss: "5057", status: true },
  { sigla: "UR1_", nome: "Urina Tipo 1", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "UROC", nome: "Urocultura", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "PFEZ", nome: "Parasitológico de Fezes", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "PSAT", nome: "PSA Total", cboEspecialidade: "225285", codTuss: "5082", status: true },
  { sigla: "PSAL", nome: "PSA Livre", cboEspecialidade: "225285", codTuss: "5082", status: true },
  { sigla: "BHCG", nome: "Beta HCG", cboEspecialidade: "225250", codTuss: "5075", status: true },
  { sigla: "EKG1", nome: "Eletrocardiograma", cboEspecialidade: "225120", codTuss: "5042", status: true },
  { sigla: "ECOC", nome: "Ecocardiograma", cboEspecialidade: "225120", codTuss: "5042", status: true },
  { sigla: "HOLT", nome: "Holter 24h", cboEspecialidade: "225120", codTuss: "5042", status: true },
  { sigla: "MAPA", nome: "MAPA 24h", cboEspecialidade: "225120", codTuss: "5042", status: true },
  { sigla: "TEST", nome: "Teste Ergométrico", cboEspecialidade: "225120", codTuss: "5042", status: true },
  { sigla: "TCCT", nome: "Tomografia Computadorizada", cboEspecialidade: "225320", codTuss: "5088", status: true },
  { sigla: "RSMG", nome: "Ressonância Magnética", cboEspecialidade: "225320", codTuss: "5088", status: true },
  { sigla: "USAB", nome: "Ultrassonografia Abdominal", cboEspecialidade: "225320", codTuss: "5088", status: true },
  { sigla: "USOB", nome: "Ultrassonografia Obstétrica", cboEspecialidade: "225320", codTuss: "5088", status: true },
  { sigla: "MAMO", nome: "Mamografia", cboEspecialidade: "225320", codTuss: "5088", status: true },
  { sigla: "RXT_", nome: "Raio-X de Tórax", cboEspecialidade: "225320", codTuss: "5088", status: true },
  { sigla: "COLN", nome: "Colonoscopia", cboEspecialidade: "225310", codTuss: "5086", status: true },
  { sigla: "ENDO", nome: "Endoscopia Digestiva", cboEspecialidade: "225310", codTuss: "5086", status: true },
  { sigla: "DENS", nome: "Densitometria Óssea", cboEspecialidade: "225136", codTuss: "5051", status: true },
  { sigla: "AUDI", nome: "Audiometria", cboEspecialidade: "225275", codTuss: "5080", status: true },
  { sigla: "ESPI", nome: "Espirometria", cboEspecialidade: "225127", codTuss: "5047", status: true },
  { sigla: "EEG_", nome: "Eletroencefalograma", cboEspecialidade: "225112", codTuss: "5039", status: true },
  { sigla: "ENMG", nome: "Eletroneuromiografia", cboEspecialidade: "225350", codTuss: "5094", status: true },
  { sigla: "PAHO", nome: "Painel Hormonal", cboEspecialidade: "225155", codTuss: "5059", status: true },
  { sigla: "PAHE", nome: "Painel Hepático", cboEspecialidade: "225335", codTuss: "5091", status: true },
  { sigla: "PARE", nome: "Painel Renal", cboEspecialidade: "225109", codTuss: "5037", status: true },
  { sigla: "COAG", nome: "Coagulograma", cboEspecialidade: "225185", codTuss: "5065", status: true },
  { sigla: "TIPG", nome: "Tipagem Sanguínea", cboEspecialidade: "225335", codTuss: "5091", status: true }
];

async function main() {
  await prisma.procedimento.createMany({
    data: procedimentos,
    skipDuplicates: true
  });

  console.log(`Seed: ${procedimentos.length} procedimentos processados (duplicados ignorados).`);
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
