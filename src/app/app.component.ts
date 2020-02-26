import { Component, ChangeDetectorRef } from '@angular/core';
import { Usuario } from './model/usuario';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading = false;

  title = 'desafio-frwk';
  nomeDoUsuario: string = '';
  usuarioLogado: Usuario;

  /**
   * 
   * @param authService 
   * @param router 
   * @param toastr 
   */
  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {

    this.router.events.subscribe((event: Event) => {
      
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.authService.getUsuariologado().subscribe(
      res => {
        this.nomeDoUsuario = res.nome;
        this.usuarioLogado = res;
    });
  }

  /**
   * 
   */
  ngOnInit() {
  }

  /**
   * 
   */
  logout() {

    this.authService.logout();
    //this.router.navigate(['/login']);
    this.router.navigate(['/login']).then(() => window.location.reload());
    this.toastr.success('Logout realizado com sucesso');
  }

}
