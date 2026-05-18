export interface IProcedimento {
  id: string;
  sigla: string;
  nome: string;
  cboEspecialidade: string;
  codTuss: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}