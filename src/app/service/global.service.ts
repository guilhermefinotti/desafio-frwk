import { Injectable, Directive } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable()
export class GlobalService {

    private usuario : Usuario;

    constructor() { }

    setUsuario(user) {
        this.usuario = user;
    }

    getUsuario() {
        return this.usuario;
    }
}