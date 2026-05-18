import { IPaciente } from '../interface/ipaciente';

export class Paciente implements IPaciente {
  id: string;
  nome: string;
  documento: string;
  dataNascimento: string;
  telefone: string;
  celular: string;
  foto: string | null;
  biometria: string | null;
  tipoSanguineo: string;
  whatsapp: boolean;
  status: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any = {}) {
    this.id = data.id ?? data.Id ?? '';
    this.nome = data.nome ?? data.Nome ?? data.name ?? data.Name ?? '';
    this.documento = data.documento ?? data.Documento ?? '';
    this.dataNascimento = data.dataNascimento ?? data.DataNascimento ?? data.dataNascimento ?? '';
    this.telefone = data.telefone ?? data.Telefone ?? '';
    this.celular = data.celular ?? data.Celular ?? '';
    this.foto = data.foto ?? data.Foto ?? null;
    this.biometria = data.biometria ?? data.Biometria ?? null;
    this.tipoSanguineo = data.tipoSanguineo ?? data.TipoSanguineo ?? '';
    this.whatsapp = data.whatsapp ?? data.Whatsapp ?? false;
    this.status = data.status || data.Status ? 'Ativo' : 'Inativo';
    this.cep = data.cep ?? data.Cep ?? '';
    this.logradouro = data.logradouro ?? data.Logradouro ?? '';
    this.numero = data.numero ?? data.Numero ?? '';
    this.bairro = data.bairro ?? data.Bairro ?? '';
    this.complemento = data.complemento ?? data.Complemento ?? '';
    this.cidade = data.cidade ?? data.Cidade ?? '';
    this.uf = data.uf ?? data.UF ?? data.uf ?? '';
    this.createdAt = data.createdAt ?? data.CreatedAt ?? '';
    this.updatedAt = data.updatedAt ?? data.UpdatedAt ?? '';
  }
}
