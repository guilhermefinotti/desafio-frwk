import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { Comentario } from 'src/app/model/comentario';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  usuarioLogado : Usuario;

  conteudo: string
  comentario : Comentario;
  postId : string;
  postSelecionado : Post;


  constructor(private postService: PostService,
              private authService : AuthService,
              private route : ActivatedRoute,
              private router : Router,
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
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
          this.postId = queryParams['postId'];
      }
    );


    this.postService.buscarPostPorId(this.postId).subscribe((res) => {
      this.postSelecionado = res;
    });
    this.comentario = new Comentario();    
  }


  /**
   * 
   */
  criar(){

    this.comentario.usuario = this.usuarioLogado;
    this.comentario.post = this.postSelecionado;

    this.postService.comentar(this.comentario).subscribe((res) => {      
      this.toastr.success('Comentário registrado com sucesso');
      this.router.navigate(['/blog']);
    });
    this.comentario = new Comentario();   
  }


  /**
   * 
   */
  limpar() {
    this.comentario = new Comentario();
  }

    /**
   * 
   */
  voltar() {
    this.router.navigate(['/blog']);
  }

}
