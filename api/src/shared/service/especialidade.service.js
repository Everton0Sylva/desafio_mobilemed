import fs from 'fs';

const especialidades =
  JSON.parse(

    fs.readFileSync(

      new URL(
        '../imposts/especialidades.json',
        import.meta.url
      )
    )
  );

export class EspecialidadeService {

  static listar() {

    return especialidades;
  }

  static buscarPorCbo(cbo) {

    return especialidades.find(

      item =>
        item.cbo === cbo
    );
  }

  static buscarPorDescricao(descricao) {

    return especialidades.find(

      item =>

        item.descricao
          .toLowerCase()

          .includes(
            descricao.toLowerCase()
          )
    );
  }

  static existe(cbo) {

    return especialidades.some(

      item =>
        item.cbo === cbo
    );
  }
}