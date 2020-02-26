import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../service/post.service';
import { Post } from 'src/app/model/post';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  usuarioLogado : Usuario;

  titulo: string
  conteudo: string
  arquivo: string = null
  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  post : Post;
  postRetornado : Post;
  posts = [];
  file : any;
  filestring: string;

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

    this.postService.listar().subscribe((data: any[])=>{  
			//console.log(data);  
			this.posts = data;  
		})
  }

  /**
   * 
   */
  criar(){

    this.post.usuario = this.usuarioLogado;   
    
    
    this.postService.salvar(this.post).subscribe((result) => {
      this.postRetornado = result;
      
      this.postService.upload(this.file, this.postRetornado).subscribe((res) => {
      });
      
      this.toastr.success('Post registrado com sucesso');
      this.router.navigate(['/blog']);
      
    });
    this.post = new Post();   
  }


  /**
   * 
   */
  limpar() {
    this.post = new Post();
    //this.file = null;
  }


  /**
   * 
   * @param event 
   */
  uploadImage(event){

    this.file = event.target.files[0];
  }

  /**
   * 
   */
  onUpload() {
  }

}
