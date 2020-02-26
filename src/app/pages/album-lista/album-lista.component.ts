import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/service/album.service';



@Component({
  selector: 'app-album-lista',
  templateUrl: './album-lista.component.html',
  styleUrls: ['./album-lista.component.css']
})
export class AlbumListaComponent implements OnInit {

  usuarioLogado : Usuario;
  albuns : Album[];

  loading : boolean;

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
    
    this.listar();
  }

  /**
   * 
   */
  listar() {
    this.loading = true;
    this.albumService.listar().subscribe((data: any[])=>{  
      this.albuns = data;  
      this.loading = false;
    });
  }

    /**
   * 
   * @param albumId 
   */
  detalhar(albumId : string) {
    this.loading = true;
    this.router.navigate(['/album-detalhe'], { queryParams:{ albumId : albumId} });
    this.loading = false;
  }

  /**
   * 
   * @param id 
   */
  excluir(id : string) {
    if (window.confirm('Confirma a exclusão?')) {
      this.albumService.excluir(id).subscribe((data: {}) => {
        this.toastr.success('','Exclusão realizada com sucesso');
        this.listar();
      })
    }
  }

}
