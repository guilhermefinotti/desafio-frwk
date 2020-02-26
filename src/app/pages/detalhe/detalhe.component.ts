import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../service/post.service';
import { Post } from 'src/app/model/post';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comentario } from 'src/app/model/comentario';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  usuarioLogado : Usuario;
  postId : string;
  postSelecionado : Post;
  comentarios : Comentario[];

  constructor(private postService: PostService,
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
          this.postId = queryParams['postId'];
      }
    );
    //alert('post id=>' + this.postId);

    this.postService.buscarPostPorId(this.postId).subscribe((res) => {
      this.postSelecionado = res;
      this.comentarios = this.postSelecionado.comentarios;
    });
    
    /*
    this.postService.buscarComentarios(this.postId).subscribe((data: any[]) => {
      this.comentarios = data;
      alert('comentarios:' + this.comentarios);
    });*/
  }

    /**
   * 
   * @param idComentario 
   */
  excluirComentario(idComentario : string) {

    if (window.confirm('Confirma a exclusão?')) {

      this.postService.excluirComentario(idComentario, this.postId).subscribe((data: {}) => {

        this.toastr.success('Exclusão realizada com sucesso');
        // atualiza a tela removendo o comentario excluido
        this.postService.buscarPostPorId(this.postId).subscribe((res) => {
          this.postSelecionado = res;
          this.comentarios = this.postSelecionado.comentarios;
          window.location.reload;
        });
      })
    } 
  }


  /**
   * 
   */
  voltar() {
    this.postSelecionado = new Post();
    this.router.navigate(['/blog']);
  }

  
}
