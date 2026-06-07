import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
 
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
   idioma:string = 'esp';

  getIdimo(){
    return this.idioma;
  }

  setidioma(){
    
  }

  getParet(id: any): Observable<any>{
    return this.http.get(this.apiUrl+'/parent/'+ id);
    
  }

  partnPatch(id: any,info:{}):Observable<any> {
     return this.http.patch(this.apiUrl+'/parent/'+ id,info)
  }

  crearNuevoUsuario(info:{}){

    let a =  this.http.post(this.apiUrl+'/usuario/',info).subscribe((res:any)=>{
          console.log(res);
    })
    
    return a
  }
  setComentarios(comentarios){
    return  this.http.post(this.apiUrl+'/camper_comment/',comentarios)
  }

  setParent(info:{}):Observable<any>{
   return this.http.post(this.apiUrl+'/parent_create/',info)
  }

  getComentarios(camper_id,role_id)
  {
    return this.http.get(this.apiUrl+'/campers/'+camper_id+'/comments?role_id='+role_id);
  }

  
}
