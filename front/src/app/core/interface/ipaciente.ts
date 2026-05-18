export interface IPaciente {
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
}
