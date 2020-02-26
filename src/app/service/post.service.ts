import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Post } from '../model/post';
import { Comentario } from '../model/comentario';

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
export class PostService { 

  private API_URL = "http://localhost:8080/desafio";
  

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 
   * @param id 
   */
  buscarPostPorId(id : string): Observable<Post> {
    return this.httpClient.get<Post>(this.API_URL + '/posts/' + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  /**
   * 
   */
  public buscarComentarios(id : string) {  
		return this.httpClient.get(this.API_URL + '/posts/' + id + '/comentarios');  
  }


  /**
   * 
   */
  public listar(){  
		return this.httpClient.get(this.API_URL + '/posts');  
  }
  
  
  /**
   * 
   * @param post 
   */
  salvar(post : Post) : Observable<Post> {

    console.log(JSON.stringify(post));
    return this.httpClient.post<Post>(this.API_URL + '/posts', JSON.stringify(post), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

 
  /*
  salvar(post : Post) : Observable<Post> {

    console.log(JSON.stringify(post));
    return this.httpClient.post<Post>(this.API_URL + '/posts', JSON.stringify(post), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  */


  
  /**
   * 
   * @param comentario 
   */
  comentar(comentario : Comentario) : Observable<Comentario> {

    console.log(JSON.stringify(comentario));

    return this.httpClient.post<Comentario>(this.API_URL + '/comentarios', JSON.stringify(comentario), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  /**
   * 
   * @param id 
   */
  excluir(id : string) {
    return this.httpClient.delete(this.API_URL + '/posts/'  + id, httpOptions);
  }

  

  /**
   * 
   * @param idComentario 
   */
  excluirComentario(idComentario : string, id : string) {
    return this.httpClient.delete(this.API_URL + '/posts/' + id + '/comentarios/'  + idComentario, httpOptions);
  }


  /**
   * 
   * @param file 
   */
  public upload(file: File, post : Post): Observable<any> {
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', post.id);
    return this.httpClient.post(this.API_URL + '/imagens/post', formData);
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
