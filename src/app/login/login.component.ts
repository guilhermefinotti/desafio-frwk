import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';

//import {MatDialog, MatDialogConfig} from "@angular/material";

//import { HttpHeaders } from '@angular/common/http';
//import { HttpResponse } from '@angular/common/http';
//import { map } from "rxjs/operators";

@Component({ templateUrl: 'login.component.html', 
             styleUrls: ['login.component.css'] })
export class LoginComponent implements OnInit {

    Usuario: Usuario;
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error = '';

    jwt: string;
    nomeUsuario: string;


    /**
     * 
     * @param formBuilder 
     * @param route 
     * @param router 
     * @param authService 
     */
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        //private dialog: MatDialog,
        private authService: AuthService
    ) { }

    /**
     * 
     */
    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            senha: ['', Validators.required]
        });

        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //alert('this.returnURL='+ this.returnUrl);
    }



    // convenience getter for easy access to form fields
    get formulario() { 
        return this.loginForm.controls; 
    }

    /**
     * 
     */
    onSubmit() {

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.formulario.email.value, this.formulario.senha.value)
            .subscribe(
                response => {

                    this.jwt = localStorage.getItem("token");

                    //this.router.navigate(['/blog']).then(() => window.location.reload());
                    if(this.returnUrl != '/') {
                        this.router.navigateByUrl(this.returnUrl).then(() => window.location.reload());        
                    } else {
                        //this.router.navigate(['/blog']);
                        this.router.navigate(['/blog']).then(() => window.location.reload());
                    }
                    
                },
                error => {
                    this.error = "Usuário ou senha inválido(s)!";
                });
    }
}
