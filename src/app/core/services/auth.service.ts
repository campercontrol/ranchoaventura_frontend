import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
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
            this.http.post('http://142.93.12.234:8000/usuario/reset_password',a).subscribe((res:any)=>{
              resolve = res;
            },error=>{
              reject = error;
            })
    
        })
     }
    
     login(email: string, password: string) {
      return new Promise((resolve,reject)=>{
        
           this.http.post("http://142.93.12.234:8000/token?username=" +email+ "&password="+password +"&lang=es",{ })
          .subscribe((user:any) => {
              console.log(user);
              this.loggedIn = true;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.infToken = jwt_decode(user.access_token);
              console.log(this.infToken.role_id);
              
              if(this.infToken.role_id>1){
                this.router.navigate(['dashboard/staff']);
                console.log(this.infToken);

              }else{
                this.router.navigate(['dashboard']);
                console.log(this.infToken);

              }
           
                
              resolve(true);
          }),error =>{
            throw new Error('Uh-oh!');
          };
      })
    }
    login2(email: string, password: string) {
      return new Promise((resolve,reject)=>{
           this.http.post("http://142.93.12.234:8000/token?username=" +email+ "&password="+password +"&lang=es",{ })
          .subscribe((user:any) => {
              console.log(user);
              this.loggedIn = true;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.infToken = jwt_decode(user.access_token);
              this.router.navigate(['/dashboard/parents/new-camper']);
           
                console.log(this.infToken);
                
              resolve(user);
          }),error =>{
              reject(error);
          };
      })
    }

    logaot(){
     let a =JSON.parse(localStorage.getItem('currentUser'));
     if(a){
      this.infToken = jwt_decode(a.access_token);
      this.loggedIn = true;
     }else{
      this.loggedIn = false;
      this.router.navigate(['login']);

     }

    }

    recuperarContra(a){
     return  this.http.post("http://142.93.12.234:8000/usuario/reset_password",a)

    }
   
}

