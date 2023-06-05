import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  resetContrasena(a){
    return new Promise((resolve,reject)=>{
        this.http.post('http://142.93.12.234:8000/usuario/reset_password',a).subscribe((res:any)=>{
          resolve = res;
        },error=>{
          reject = error;
        })

    })
 }
}
