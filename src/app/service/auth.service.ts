import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Usuario } from '../model/usuario';


/**
 * 
 */
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Access-Control-Expose-Headers": "Authorization"
    }),
  };


@Injectable({ providedIn: 'root' })
export class AuthService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;
    public usuarioLogado : Usuario;

    @Output() 
    getLoggedInName: EventEmitter<any> = new EventEmitter();

    token : string;

    /**
     * 
     * @param http 
     */
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * 
     */
    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }


    /**
     * 
     * @param usuario 
     * @param senha 
     */
    login(usuario: string, senha: string) {

        this.getLoggedInName.emit(usuario);

        return this.http.post<Usuario>('http://localhost:8080/desafio/login'
                        , {usuario, senha }
                        , {headers: new HttpHeaders().set('Content-Type', 'application/json')
                        , observe: 'response'})
                        .pipe(map(response => {

            if (response) {                            
                //alert('auth.service.login.response:' + JSON.stringify(response));
            }

            const token = response.headers.get('Authorization');

            if(token) {
                localStorage.setItem('token', token);
            }

            return token;
        }));                        
    }

    
    /**
     * 
     */
    public getUsuariologado(): Observable<Usuario>{  
        return this.http.get<Usuario>('http://localhost:8080/desafio/usuarios/logado');
    }
    
     
    /**
     * 
     */
    logout() {

        localStorage.removeItem('token');
        //this.currentUserSubject.next(null);
    }
}