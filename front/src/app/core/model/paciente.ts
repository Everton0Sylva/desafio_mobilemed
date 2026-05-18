import { IPaciente } from '../interface/ipaciente';
import { TipoSanguineo } from './tipo-sanguineo.enum';

export class Paciente implements IPaciente {
  id: string;
  nome: string;
  documento: string;
  dataNascimento: string;
  telefone: string;
  celular: string;
  foto: string | null;
  biometria: string | null;
  tipoSanguineo: TipoSanguineo | '';
  whatsapp: boolean;
  status: boolean;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any = {}) {
      this.id = data.id ?? data.Id ?? '';
      this.nome = data.nome ?? data.Nome ?? data.name ?? data.Name ?? '';
      this.documento = data.documento ?? data.Documento ?? '';
      this.dataNascimento = data.dataNascimento ?? data.DataNascimento ?? data.dataNascimento ?? '';
      this.telefone = data.telefone ?? data.Telefone ?? '';
      this.celular = data.celular ?? data.Celular ?? '';
      this.foto = data.foto ?? data.Foto ?? null;
      this.biometria = data.biometria ?? data.Biometria ?? null;
      const bloodType = data.tipoSanguineo ?? data.TipoSanguineo ?? '';
      this.tipoSanguineo = bloodType as TipoSanguineo | '';
      this.whatsapp = data.whatsapp ?? data.Whatsapp ?? false;
      const statusValue = data.status ?? data.Status;
      this.status = data.status ?? data.Status ?? true;

      this.cep = data.cep ?? data.Cep ?? '';
      this.logradouro = data.logradouro ?? data.Logradouro ?? '';
      this.numero = data.numero ?? data.Numero ?? '';
      this.bairro = data.bairro ?? data.Bairro ?? '';
      this.complemento = data.complemento ?? data.Complemento ?? '';
      this.cidade = data.cidade ?? data.Cidade ?? '';
      this.uf = data.uf ?? data.UF ?? data.uf ?? '';
      this.createdAt = new Date(data.createdAt ?? data.CreatedAt ?? new Date());
      this.updatedAt = new Date(data.updatedAt ?? data.UpdatedAt ?? new Date());
    }
  }
