import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamperService {

  constructor(private http : HttpClient) { }


  getCatalogos(idioma:string = 'es'){
    return this.http.get('https://api-dev.campercontrol.com/camper_form/es')
  }

  setCamper(info:{}){
    return this.http.post('https://api-dev.campercontrol.com/camper/',info)
   }
   

   lengua(){
    return this.http.get('/src/assets/json/lengua.json');
   }

   prueba(){
    return this.http.get('https://api-dev.campercontrol.com/camper_complete/13/es');
   }

   createCamper(info:{}){
     return this.http.post('https://api-dev.campercontrol.com/parent/',info)
   }
   setPhoto(info:any):Observable<any>{
    
    console.log(info);
    
    return this.http.post('https://api-dev.campercontrol.com/photo/upload_image',info)
   }
   setpdf(info:any):Observable<any>{
    
    //console.log(info);
    
    return this.http.post('https://api-dev.campercontrol.com/staff/upload_cv',info)
   }

   getCamper(id:any):Observable<any>{
    return this.http.get('https://api-dev.campercontrol.com/camper_complete/'+id+'/es')
   }
   getSearchParen(id:any):Observable<any>{
    return this.http.get('https://api-dev.campercontrol.com/parent/'+id)
   }
   updateCamper(id:any,info:{}){
    return this.http.patch('https://api-dev.campercontrol.com/camper/'+id,info)

   }
   deletCamper(id:any){
    return this.http.delete('https://api-dev.campercontrol.com/delete_camper/'+id,{})

   }

   getHijos(id){
    return this.http.get('https://api-dev.campercontrol.com/parent_dashboard/'+id)

   }

   informacionCampamento(camper_id :any, camp_id :any){
    return this.http.get('https://api-dev.campercontrol.com/parent_camper_in_camp/' + camper_id +'/'+camp_id)
   }
   getPerfil(camper_id :any){
    return this.http.get('https://api-dev.campercontrol.com/camper_profile/' + camper_id )
   }

   getCapsT(camper_id :any){
    return this.http.get('https://api-dev.campercontrol.com/camper_dashboard/' + camper_id )
   }
   postTraining(info: any) {
    return this.http.post('https://api-dev.campercontrol.com/training/', info)
   }
   postEventos(info: any) {
    return this.http.post('https://api-dev.campercontrol.com/training_event/', info)
   }
   getTraining() {
    return this.http.get('https://api-dev.campercontrol.com/training/' )
   }
   getTemporadas() {
    return this.http.get('https://api-dev.campercontrol.com/season/' )
   }
   updateTraining(info,id) {
    return this.http.patch('https://api-dev.campercontrol.com/training/'+id,info )
   }

   updateEventos(info,id) {
    return this.http.patch('https://api-dev.campercontrol.com/training_event/'+id,info )
   }


   deletTraining(id) {
    return this.http.delete('https://api-dev.campercontrol.com/staff_unsubscribe/'+id, )
   }
   //eventos
   getTrainingEvent() {
    return this.http.get('https://api-dev.campercontrol.com/training_event/' )
   }

   postTrainingPost(info: any) {
    return this.http.post('https://api-dev.campercontrol.com/training_event/', info)
   }
   updateTrainingEvent(info,id) {
    return this.http.patch('https://api-dev.campercontrol.com/training_event/'+id,info )
   }
   deletTrainingEvents(id) {
    return this.http.delete('https://api-dev.campercontrol.com/staff_unsubscribe_training/'+id, )
   }
   

   public getBauch(camper_id :any,capm_id){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get('https://api-dev.campercontrol.com/payment_boucher/' + camper_id+"/"+capm_id, {headers,responseType: 'blob' as 'json'} )
   }


   getEventos(){
    return this.http.get('https://api-dev.campercontrol.com/training_event/' )
   }


   get_temporada(){
    return this.http.get('https://api-dev.campercontrol.com/season/');
  }
  post_temporada(data){
    return this.http.post('https://api-dev.campercontrol.com/season/',data);
  }
  patch_temp(data,id){
    return this.http.patch('https://api-dev.campercontrol.com/season/'+id,data);
  }

  delet_temp(id){
    return this.http.delete('https://api-dev.campercontrol.com/delete/season/'+id);
  }
  
  

}
