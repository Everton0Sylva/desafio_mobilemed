export class PacienteMapper {

  static toPersistence(data) {

    return {
      nome: data.nome,
      documento: data.documento,
      telefone: data.telefone,
      celular: data.celular,
      foto: data.foto,
      biometria: data.biometria,
      tipoSanguineo: data.tipoSanguineo,
      whatsapp: data.whatsapp,
      status: data.status,
      idEndereco: data.idEndereco
    };
  }

  static toResponse(data) {

    return {
      id: data.id,
      nome: data.nome,
      documento: data.documento,
      telefone: data.telefone,
      celular: data.celular,
      tipoSanguineo: data.tipoSanguineo,
      whatsapp: data.whatsapp,
      status: data.status,
      endereco: data.endereco,
      createdAt: data.createdAt
    };
  }
}