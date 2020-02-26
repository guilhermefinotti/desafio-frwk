import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/service/album.service';
import { forkJoin } from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';



@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  usuarioLogado : Usuario;
  album : Album;
  albumRetornado : Album;

  files : any[];

  /**
   * 
   * @param albumService 
   * @param authService 
   * @param router 
   * @param toastr 
   */
  constructor(private albumService: AlbumService,
              private authService : AuthService,
              private router: Router,
              private toastr: ToastrService) {

    this.authService.getUsuariologado().subscribe(
      res => {
        this.usuarioLogado = res;
    });
  }


  /**
   * 
   */
  ngOnInit() {
    this.album = new Album();
  }


  /**
   * 
   */
  criar(){

    //alert('=>criar');
    this.album.usuario = this.usuarioLogado;   
    
    this.albumService.salvar(this.album).subscribe((result) => {

      this.albumRetornado = result;
      //alert(this.albumRetornado.id);

      // utilizado para chamar o service multiplas vezes
      let observables = new Array();
      for(let file of this.files) {
          observables.push(this.albumService.upload(file, this.albumRetornado));
      }
      forkJoin(observables).subscribe( 
          res => console.log(res),
      );

    });
    
    this.toastr.success('Álbum registrado com sucesso');
    this.router.navigate(['/album-lista']);
  
    this.album = new Album();   
  }


  /**
   * 
   */
  limpar() {
    this.album = new Album();
    this.files = null;
  }


  /**
   * 
   * @param event 
   */
  uploadImage(event){
    this.files = event.target.files;
  }

}
