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
    return this.http.get(' https://api.kincamp.com/parent/'+ id);
    
  }

  partnPatch(id: any,info:{}):Observable<any> {
     return this.http.patch(' https://api.kincamp.com/parent/'+ id,info)
  }

  crearNuevoUsuario(info:{}){

    let a =  this.http.post(' https://api.kincamp.com/usuario/',info).subscribe((res:any)=>{
          console.log(res);
    })
    
    return a
  }
  setComentarios(comentarios){
    return  this.http.post(' https://api.kincamp.com/camper_comment/',comentarios)
  }

  setParent(info:{}):Observable<any>{
   return this.http.post(' https://api.kincamp.com/parent_create/',info)
  }

  getComentarios(camper_id,role_id)
  {
    return this.http.get(' https://api.kincamp.com/campers/'+camper_id+'/comments?role_id='+role_id);
  }

  
}
