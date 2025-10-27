import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { preventDefault } from '@fullcalendar/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";


@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    loggedIn:boolean = false;
    infToken!:any;

    constructor(private http: HttpClient,private router:Router ) {
    }

    /**
     * Returns the current user
     */
   
    resetContrasena(a){
        return new Promise((resolve,reject)=>{
            this.http.post('https://api-dev.kincamp.com/user/send_mail_password_reset',a).subscribe((res:any)=>{
              resolve = res;
            },error=>{
              reject = error;
            })
    
        })
     }
    
   
  login(email: string, password: string) {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    return this.http.post(
      'https://api-dev.kincamp.com/token',
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        })
      }
    );
  }
    
  login2(email: string, password: string) {
    console.log(password,'data');
    
    return new Promise((resolve, reject) => {
      const body = new HttpParams()
        .set('username', email)
        .set('password', password);
  
      this.http.post(
        "https://api-dev.kincamp.com/token",
        body.toString(),
        
      ).subscribe(
        (user: any) => {
          console.log(user);
          this.loggedIn = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.infToken = jwt_decode(user.access_token);
          this.router.navigate(['/dashboard/parents/new-camper']);
          console.log(this.infToken);
  
          resolve(user);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }
    logaot(){
     let a =JSON.parse(localStorage.getItem('currentUser'));
     if(a){
      this.infToken = jwt_decode(a.access_token);
      this.loggedIn = true;
     }

    }

    recuperarContra(a){
     return  this.http.post("https://api-dev.kincamp.com/user/send_mail_password_reset",a)

    }

    cambiarContrasena(email,a){
      return  this.http.post("https://api-dev.kincamp.com/usuario/change_password/"+email,a)
 
     }
     restPassword(token,a){
      return  this.http.post("https://api-dev.kincamp.com/user/reset_password?t="+token,a)
 
     }

     validarCuenta(token){
      return  this.http.post("https://api-dev.kincamp.com/user/verify/?t="+token,"")
 
     }
     
     cambiarEmail(email,a){
      return  this.http.post("https://api-dev.kincamp.com/usuario/change_email/"+email,a)
 
     }
   
}

