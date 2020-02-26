import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Post } from 'src/app/model/post';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  usuarioLogado : Usuario;
  loading : boolean;

  post : Post;
  posts = [];

  constructor(private postService: PostService,
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

    this.post = new Post();
    this.listar();
  }

  /**
   * 
   */
  listar() {
    this.loading = true;
    this.postService.listar().subscribe((data: any[])=>{  
			console.log(data);  
      this.posts = data;
      this.loading = false;  
    })
  }

  /**
   * 
   * @param postId 
   */
  comentar(postId : string) {
      //alert('vai comentar o post ' + postId);
      this.router.navigate(['/comentario'], { queryParams:{ postId : postId} });
  }

  
  /**
   * 
   * @param postId 
   */
  detalhar(postId : string) {
    //alert('vai detalhar o post ' + postId);
    this.router.navigate(['/detalhe'], { queryParams:{ postId : postId} });
//    this.router.navigate(['/detalhe'], { queryParams:{ postId : postId} });
}

  /**
   * 
   * @param id 
   */
  excluir(id : string) {
    if (window.confirm('Confirma a exclusão?')) {
      this.postService.excluir(id).subscribe((data: {}) => {
        this.toastr.success('','Exclusão realizada com sucesso');
        this.listar();
      })
    }
  }

}
