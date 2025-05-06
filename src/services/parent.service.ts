import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
 

  constructor(private http:HttpClient) { }
   idioma:string = 'esp';

  getIdimo(){
    return this.idioma;
  }

  setidioma(){
    
  }

  getParet(id: any): Observable<any>{
    return this.http.get('app.campercontrol.com:5050/parent/'+ id);
    
  }

  partnPatch(id: any,info:{}):Observable<any> {
     return this.http.patch('app.campercontrol.com:5050/parent/'+ id,info)
  }

  crearNuevoUsuario(info:{}){

    let a =  this.http.post('app.campercontrol.com:5050/usuario/',info).subscribe((res:any)=>{
          console.log(res);
    })
    
    return a
  }
  setComentarios(comentarios){
    return  this.http.post('app.campercontrol.com:5050/camper_comment/',comentarios)
  }

  setParent(info:{}):Observable<any>{
   return this.http.post('app.campercontrol.com:5050/parent_create/',info)
  }

  
}
