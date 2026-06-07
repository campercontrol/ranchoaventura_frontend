import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged = false;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private router:Router) { }
  resetContrasena(a){
    return new Promise((resolve,reject)=>{
        this.http.post(this.apiUrl+'/user/send_mail_password_reset',a).subscribe((res:any)=>{
          resolve = res;
        },error=>{
          reject = error;
        })
        this.router.navigate(['login'])
    })
 }

 

}
