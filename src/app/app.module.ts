import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from 'ngx-gallery';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatIconModule,
         MatCardModule,
         MatButtonModule,
         MatNativeDateModule, 
         MatDatepickerModule,
         MatFormFieldModule,
         MatInputModule,
         MatProgressBarModule,
         MatTooltipModule,
         MatMenuModule,
         MatProgressSpinner,
         MatProgressSpinnerModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ErrorInterceptor } from './security/error.interceptor';
import { ComentarioComponent } from './pages/comentario/comentario.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';
import { AlbumComponent } from './pages/album/album.component';
import { AlbumListaComponent } from './pages/album-lista/album-lista.component';
import { AlbumDetalheComponent } from './pages/album-detalhe/album-detalhe.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogComponent,
    PostComponent,
    ComentarioComponent,
    DetalheComponent,
    AlbumComponent,
    AlbumListaComponent,
    AlbumDetalheComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule, 
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxGalleryModule
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
