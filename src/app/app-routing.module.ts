import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { LoginComponent } from './login';
import { AuthGuard } from './security/auth.guard';
import { ComentarioComponent } from './pages/comentario/comentario.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';
import { AlbumComponent } from './pages/album/album.component';
import { AlbumListaComponent } from './pages/album-lista/album-lista.component';
import { AlbumDetalheComponent } from './pages/album-detalhe/album-detalhe.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'blog', 
    component: BlogComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'post', 
    component: PostComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'comentario', 
    component: ComentarioComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'detalhe', 
    component: DetalheComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'usuario', 
    component: UsuarioComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'album', 
    component: AlbumComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'album-lista', 
    component: AlbumListaComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'album-detalhe', 
    component: AlbumDetalheComponent, 
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
