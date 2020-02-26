import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../model/usuario';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type':'application/json;charset=UTF-8'
    //'Authorization':'authkey',
    //'userid':'1'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = "http://localhost:8080/desafio";
    

  constructor(private httpClient: HttpClient) {
  }


  /**
   * 
   */
  public listar(){  
		return this.httpClient.get(this.API_URL + '/usuarios');  
  }

  
  
  // HttpClient API post() method => 
  salvar(usuario : Usuario) : Observable<Usuario> {

    console.log(JSON.stringify(usuario));
    return this.httpClient.post<Usuario>(this.API_URL + '/usuarios', JSON.stringify(usuario), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


    // Error handling 
    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }

}
