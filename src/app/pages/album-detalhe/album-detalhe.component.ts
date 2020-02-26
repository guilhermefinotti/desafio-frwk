import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/service/album.service';


@Component({
  selector: 'app-album-detalhe',
  templateUrl: './album-detalhe.component.html',
  styleUrls: ['./album-detalhe.component.css']
})
export class AlbumDetalheComponent implements OnInit {

  usuarioLogado : Usuario;
  albumId : string;
  albumSelecionado : Album;

  galleryImages: NgxGalleryImage[];
  galleryOptions: NgxGalleryOptions[];

  /**
   * 
   * @param albumService 
   * @param authService 
   * @param route 
   * @param router 
   * @param toastr 
   * @param domSanitizer 
   */
  constructor(private albumService: AlbumService,
              private authService : AuthService,
              private route : ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private domSanitizer: DomSanitizer) {
                
    this.authService.getUsuariologado().subscribe(
      res => {
        this.usuarioLogado = res;
    });
  }

  /**
   * 
   */
  ngOnInit() {

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
          this.albumId = queryParams['albumId'];
      }
    );

    this.albumService.buscarAlbumPorId(this.albumId).subscribe((res) => {
      this.albumSelecionado = res;
    });
    
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];

    this.galleryImages = [];
  }

  /**
   * 
   */
  ngAfterViewInit() {
    this.carregarAlbum();
  }

  /**
   * 
   */
  carregarAlbum() {

    this.albumService.buscarAlbumPorId(this.albumId).subscribe(res => {
      this.albumSelecionado = res;
      /*
      alert('album carregado:' + this.album.id);
      alert('album qtde imagens:' + this.album.imagens.length);
      alert(this.album.imagens[1].arquivo);
      tamanho = this.album.imagens.length;
      alert('tamanho:' + tamanho);
      */
    });

    for(let imagem of this.albumSelecionado.imagens) {

      this.galleryImages.push({
        small: 'data:image/jpg;base64,' + imagem.arquivo,
        medium: 'data:image/jpg;base64,' + imagem.arquivo,
        big: 'data:image/jpg;base64,' + imagem.arquivo,
    });
    }
  }


  /**
   * 
   */
  voltar() {
    this.albumSelecionado = new Album();
    this.router.navigate(['/album-lista']);
  }
  
}
