import { Deserializable } from './deserializable.model';
import { Usuario } from './usuario';
import { Comentario } from './comentario';
import { Album } from './album';

export class Imagem implements Deserializable{

    id: string;   
    arquivo: any;
    album : Album;
    
    deserialize(input: any): this {
      
      Object.assign(this, input);
      this.album = new Album().deserialize(input.album);
      return this;
    }
  }