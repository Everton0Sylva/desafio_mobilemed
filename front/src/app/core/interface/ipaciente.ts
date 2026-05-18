import { TipoSanguineo } from '../model/tipo-sanguineo.enum';

export interface IPaciente {
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
}
