import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged = false;

  constructor(private http: HttpClient,private router:Router) { }
  resetContrasena(a){
    return new Promise((resolve,reject)=>{
        this.http.post('https://api.kincamp.com/user/send_mail_password_reset',a).subscribe((res:any)=>{
          resolve = res;
        },error=>{
          reject = error;
        })
        this.router.navigate(['login'])
    })
 }

 

}
