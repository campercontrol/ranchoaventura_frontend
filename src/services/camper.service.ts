import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamperService {

  constructor(private http : HttpClient) { }


  getCatalogos(idioma:string = 'es'){
    return this.http.get('http://142.93.12.234:8000/camper_form/es')
  }

  setCamper(info:{}){
    return this.http.post('http://142.93.12.234:8000/camper/',info)
   }

   prueba(){
    return this.http.get('http://142.93.12.234:8000/camper_complete/13/es');
   }

   createCamper(info:{}){
     return this.http.post('http://142.93.12.234:8000/parent/',info)
   }
   setPhoto(info:any):Observable<any>{
    
    console.log(info);
    
    return this.http.post('http://142.93.12.234:8000/photo/upload_image',info)
   }

   getCamper(id:any):Observable<any>{
    return this.http.get('http://142.93.12.234:8000/camper_complete/'+id+'/es')
   }

   updateCamper(id:any,info:{}){
    return this.http.patch('http://142.93.12.234:8000/camper/'+id,info)

   }

   getHijos(id = 1){
    return this.http.get('http://142.93.12.234:8000/parent_dashboard/'+id)

   }

   informacionCampamento(camper_id :any, camp_id :any){
    return this.http.get('http://142.93.12.234:8000/parent_camper_in_camp/' + camper_id +'/'+camp_id)
   }
   getPerfil(camper_id :any){
    return this.http.get('http://142.93.12.234:8000/camper_profile/' + camper_id )
   }

   getCapsT(camper_id :any){
    return this.http.get('http://142.93.12.234:8000/camper_dashboard/' + camper_id )
   }
   postTraining(info: any) {
    return this.http.post('http://142.93.12.234:8000/training', info)
   }
  

}
