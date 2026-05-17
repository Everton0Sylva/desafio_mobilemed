import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";

// Configuração de diretório para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos dos arquivos
const ARQUIVO_XLS = path.join(__dirname, "tabela24cbo.xls");
const ARQUIVO_JSON = path.join(__dirname, "especialidades.json");

async function importarPlanilha() {
  try {
    // 1. Carrega o arquivo Excel
    const workbook = xlsx.readFile(ARQUIVO_XLS);
    const primeiraAba = workbook.SheetNames[0];
    const planilha = workbook.Sheets[primeiraAba];

    // 2. Converte usando 'header: "A"' para mapear as colunas estritamente pelas letras (A, B, C...)
    // defval: "" evita erros de campos indefinidos
    const dadosBrutos = xlsx.utils.sheet_to_json(planilha, {
      header: "A",
      defval: "",
    });

    // 3. Filtra e mapeia os dados apontando para as colunas físicas exatas
    // Como 'header: "A"' mapeia tudo desde a linha 1, vamos filtrar os dados reais do CBO
    const especialidadesTratadas = dadosBrutos
      .map((linha) => {
        // Força os valores a virarem texto limpo
        const cbo = String(linha["A"] || "").trim(); // Coluna A (Código CBO)
        const descricao = String(linha["B"] || "").trim(); // Coluna B (Termo / Especialidade)
        const sigPs = String(linha["C"] || "").trim(); // Coluna C (Código SIG/PS)

        return {
          cbo: cbo,
          descricao: descricao,
          sig_ps: sigPs,
        };
      })
      .filter((item) => {
        // Validações estritas para garantir que só entram dados válidos a partir da linha 5:
        // 1. O código CBO não pode estar vazio
        // 2. O código CBO precisa conter apenas números válidos
        // 3. Ignora linhas de cabeçalho ou textos institucionais da ANS
        return (
          item.bo !== "" &&
          !isNaN(item.cbo) &&
          item.cbo.length >= 4
        );
      });

    if (especialidadesTratadas.length === 0) {
      return;
    }

    // 4. Grava no seu arquivo JSON final estruturado
    await fs.writeFile(
      ARQUIVO_JSON,
      JSON.stringify(especialidadesTratadas, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error("❌ Erro crítico ao processar a planilha:", error.message);
  }
}

importarPlanilha();
