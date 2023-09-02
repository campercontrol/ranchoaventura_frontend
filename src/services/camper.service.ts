import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   

   lengua(){
    return this.http.get('/src/assets/json/lengua.json');
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
   setpdf(info:any):Observable<any>{
    
    //console.log(info);
    
    return this.http.post('http://142.93.12.234:8000/staff/upload_cv',info)
   }

   getCamper(id:any):Observable<any>{
    return this.http.get('http://142.93.12.234:8000/camper_complete/'+id+'/es')
   }
   getSearchParen(id:any):Observable<any>{
    return this.http.get('http://142.93.12.234:8000/parent/'+id)
   }
   updateCamper(id:any,info:{}){
    return this.http.patch('http://142.93.12.234:8000/camper/'+id,info)

   }
   deletCamper(id:any){
    return this.http.delete('http://142.93.12.234:8000/delete_camper/'+id,{})

   }

   getHijos(id){
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
   getTraining() {
    return this.http.get('http://142.93.12.234:8000/training' )
   }
   updateTraining(info,id) {
    return this.http.patch('http://142.93.12.234:8000/training/'+id,info )
   }
   deletTraining(id) {
    return this.http.delete('http://142.93.12.234:8000/staff_unsubscribe/'+id, )
   }
   //eventos
   getTrainingEvent() {
    return this.http.get('http://142.93.12.234:8000/training_event/' )
   }

   postTrainingPost(info: any) {
    return this.http.post('http://142.93.12.234:8000/training_event', info)
   }
   updateTrainingEvent(info,id) {
    return this.http.patch('http://142.93.12.234:8000/training_event/'+id,info )
   }
   deletTrainingEvents(id) {
    return this.http.delete('http://142.93.12.234:8000/staff_unsubscribe_training/'+id, )
   }
   

   public getBauch(camper_id :any,capm_id){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get('http://142.93.12.234:8000/payment_boucher/' + camper_id+"/"+capm_id, {headers,responseType: 'blob' as 'json'} )
   }


  

}
