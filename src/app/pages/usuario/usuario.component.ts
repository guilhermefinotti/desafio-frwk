import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  nome: string
  senha: string
  email: string = null
  usuario : Usuario;
  usuarioLogado : string;
  usuarios = [];

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService,
              private router : Router,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.usuario = new Usuario();
  }

  /**
   * 
   */
  salvar(){

    this.usuarioService.salvar(this.usuario).subscribe((result) => {
      this.toastr.success('Usuário registrado com sucesso');
      this.router.navigate(['/blog']);
    });
    
    this.limpar();
  }

  /**
   * 
   */
  limpar() {
    this.usuario = new Usuario();
  }

}
