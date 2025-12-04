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
    return this.http.get('https://api.ranchoaventuramexico.com/parent/'+ id);
    
  }

  partnPatch(id: any,info:{}):Observable<any> {
     return this.http.patch('https://api.ranchoaventuramexico.com/parent/'+ id,info)
  }

  crearNuevoUsuario(info:{}){

    let a =  this.http.post('https://api.ranchoaventuramexico.com/usuario/',info).subscribe((res:any)=>{
          console.log(res);
    })
    
    return a
  }
  setComentarios(comentarios){
    return  this.http.post('https://api.ranchoaventuramexico.com/camper_comment/',comentarios)
  }

  setParent(info:{}):Observable<any>{
   return this.http.post('https://api.ranchoaventuramexico.com/parent_create/',info)
  }

  getComentarios(camper_id,role_id)
  {
    return this.http.get('https://api.ranchoaventuramexico.com/campers/'+camper_id+'/comments?role_id='+role_id);
  }

  
}
