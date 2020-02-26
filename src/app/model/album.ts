import { Deserializable } from './deserializable.model';
import { Usuario } from './usuario';
import { Imagem } from './imagem';

export class Album implements Deserializable{

    id: string;
    titulo: string;
    descricao: string;
    //imagem: any[];

    usuario : Usuario;
    imagens: Imagem[];
    
    deserialize(input: any): this {
      
      Object.assign(this, input);
      this.usuario = new Usuario().deserialize(input.usuario);
      this.imagens = input.comentarios.map(imagem => new Imagem().deserialize(imagem));
      return this;
    }
  }