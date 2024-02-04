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
    return this.http.get('http://142.93.12.234:8000/parent/'+ id);
    
  }

  partnPatch(id: any,info:{}):Observable<any> {
     return this.http.patch('http://142.93.12.234:8000/parent/'+ id,info)
  }

  crearNuevoUsuario(info:{}){

    let a =  this.http.post('http://142.93.12.234:8000/usuario/',info).subscribe((res:any)=>{
          console.log(res);
    })
    
    return a
  }
  setComentarios(comentarios){
    return  this.http.post('http://142.93.12.234:8000/camper_comment/',comentarios)
  }

  setParent(info:{}):Observable<any>{
   return this.http.post('http://142.93.12.234:8000/parent_create/',info)
  }

  
}
