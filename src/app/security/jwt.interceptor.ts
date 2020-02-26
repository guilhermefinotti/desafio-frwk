import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../model/usuario';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    token : string;

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authService.currentUserValue;
        //const isLoggedIn = currentUser && currentUser.token;
        //const isApiUrl = request.url.startsWith(config.apiUrl);      
        const isLoggedIn = true;
        const isApiUrl = true;

        this.token = localStorage.getItem("token");

        //TODO: verificar
        if (isLoggedIn && isApiUrl) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }

        return next.handle(request);
    }
}