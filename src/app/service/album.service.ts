import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Album } from '../model/album';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type':'application/json;charset=UTF-8'
    //'Authorization':'authkey',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService { 

  private API_URL = "http://localhost:8080/desafio";
  

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 
   * @param id 
   */
  buscarAlbumPorId(id : string): Observable<Album> {
    return this.httpClient.get<Album>(this.API_URL + '/albuns/' + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  /**
   * 
   */
  public buscarComentarios(id : string) {  
		return this.httpClient.get(this.API_URL + '/albuns/' + id + '/comentarios');  
  }


  /**
   * 
   */
  public listar(){  
		return this.httpClient.get(this.API_URL + '/albuns');  
  }
  
  
  /**
   * 
   * @param album 
   */
  salvar(album : Album) : Observable<Album> {

    return this.httpClient.post<Album>(this.API_URL + '/albuns', JSON.stringify(album), httpOptions)
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
    return this.httpClient.delete(this.API_URL + '/albuns/'  + id, httpOptions);
  }


  /**
   * 
   * @param file 
   */
  public upload(file: File, album : Album): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', album.id);
    return this.httpClient.post(this.API_URL + '/imagens/album', formData);  
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
