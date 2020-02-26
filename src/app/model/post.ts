import { Deserializable } from './deserializable.model';
import { Usuario } from './usuario';
import { Comentario } from './comentario';

export class Post implements Deserializable{

    id: string;
    titulo: string;
    texto: string;
    imagem: any[];

    usuario : Usuario;
    comentarios : Comentario[];
    
    deserialize(input: any): this {
      
      Object.assign(this, input);
      this.usuario = new Usuario().deserialize(input.usuario);
      this.comentarios = input.comentarios.map(comentario => new Comentario().deserialize(comentario));
      return this;
    }
  }