import { Deserializable } from './deserializable.model';

export class Usuario implements Deserializable{

    id: string;
    nome: string;
    email: string;
    senha: string;
    
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
  }