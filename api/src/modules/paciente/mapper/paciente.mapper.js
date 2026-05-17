export class PacienteMapper {
  static toPersistence(data) {
    return {
      nome: data.nome,

      documento: data.documento,

      dataNascimento: data.dataNascimento,

      telefone: data.telefone,

      celular: data.celular,

      foto: data.foto,

      biometria: null,

      tipoSanguineo: data.tipoSanguineo,

      whatsapp: false,

      status: true,

      cep: data.cep,

      logradouro: data.logradouro,

      numero: data.numero,

      bairro: data.bairro,

      complemento: data.complemento,

      cidade: data.cidade,

      uf: data.uf,
    };
  }

  static toResponse(data) {
    return {
      id: data.id,

      nome: data.nome,

      documento: data.documento,

      dataNascimento: data.dataNascimento,

      telefone: data.telefone,

      celular: data.celular,

      tipoSanguineo: data.tipoSanguineo,

      whatsapp: data.whatsapp,

      status: data.status,

      cep: data.cep,

      logradouro: data.logradouro,

      numero: data.numero,

      bairro: data.bairro,

      complemento: data.complemento,

      cidade: data.cidade,

      uf: data.uf,

      createdAt: data.createdAt,

      updatedAt: data.updatedAt,
    };
  }
}
