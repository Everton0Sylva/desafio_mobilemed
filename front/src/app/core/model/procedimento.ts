import { IProcedimento } from '../interface/iprocedimento';

export class Procedimento implements IProcedimento {
  id: string;
  sigla: string;
  nome: string;
  cboEspecialidade: string;
  codTuss: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any = {}) {
    this.id = data.id ?? data.Id ?? '';
    this.sigla = data.sigla ?? data.Sigla ?? '';
    this.nome = data.nome ?? data.Nome ?? '';
    this.cboEspecialidade = data.cboEspecialidade ?? data.CboEspecialidade ?? '';
    this.codTuss = data.codTuss ?? data.CodTuss ?? null;
    this.status = data.status ?? data.Status ?? true;
    
    this.createdAt = new Date(data.createdAt ?? data.CreatedAt ?? new Date());
    this.updatedAt = new Date(data.updatedAt ?? data.UpdatedAt ?? new Date());
  }
}