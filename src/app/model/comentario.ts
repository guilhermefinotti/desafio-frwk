import { Deserializable } from './deserializable.model';
import { Usuario } from './usuario';
import { Post } from './post';

export class Comentario implements Deserializable{

    id: string;
    texto: string;
    usuario : Usuario;
    post : Post;
    
    deserialize(input: any): this {
      
      Object.assign(this, input);
      this.usuario = new Usuario().deserialize(input.usuario);
      this.post = new Post().deserialize(input.post);
      return this;
    }
  }