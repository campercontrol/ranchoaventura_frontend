import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamperService {

  constructor(private http : HttpClient) { }


  getCatalogos(idioma:string = 'es'){
    return this.http.get('app.campercontrol.com:5050/camper_form/es')
  }

  setCamper(info:{}){
    return this.http.post('app.campercontrol.com:5050/camper/',info)
   }
   

   lengua(){
    return this.http.get('/src/assets/json/lengua.json');
   }

   prueba(){
    return this.http.get('app.campercontrol.com:5050/camper_complete/13/es');
   }

   createCamper(info:{}){
     return this.http.post('app.campercontrol.com:5050/parent/',info)
   }
   setPhoto(info:any):Observable<any>{
    
    console.log(info);
    
    return this.http.post('app.campercontrol.com:5050/photo/upload_image',info)
   }
   setpdf(info:any):Observable<any>{
    
    //console.log(info);
    
    return this.http.post('app.campercontrol.com:5050/staff/upload_cv',info)
   }

   getCamper(id:any):Observable<any>{
    return this.http.get('app.campercontrol.com:5050/camper_complete/'+id+'/es')
   }
   getSearchParen(id:any):Observable<any>{
    return this.http.get('app.campercontrol.com:5050/parent/'+id)
   }
   updateCamper(id:any,info:{}){
    return this.http.patch('app.campercontrol.com:5050/camper/'+id,info)

   }
   deletCamper(id:any){
    return this.http.delete('app.campercontrol.com:5050/delete_camper/'+id,{})

   }

   getHijos(id){
    return this.http.get('app.campercontrol.com:5050/parent_dashboard/'+id)

   }

   informacionCampamento(camper_id :any, camp_id :any){
    return this.http.get('app.campercontrol.com:5050/parent_camper_in_camp/' + camper_id +'/'+camp_id)
   }
   getPerfil(camper_id :any){
    return this.http.get('app.campercontrol.com:5050/camper_profile/' + camper_id )
   }

   getCapsT(camper_id :any){
    return this.http.get('app.campercontrol.com:5050/camper_dashboard/' + camper_id )
   }
   postTraining(info: any) {
    return this.http.post('app.campercontrol.com:5050/training', info)
   }
   postEventos(info: any) {
    return this.http.post('app.campercontrol.com:5050/training_event', info)
   }
   getTraining() {
    return this.http.get('app.campercontrol.com:5050/training' )
   }
   getTemporadas() {
    return this.http.get('app.campercontrol.com:5050/season' )
   }
   updateTraining(info,id) {
    return this.http.patch('app.campercontrol.com:5050/training/'+id,info )
   }

   updateEventos(info,id) {
    return this.http.patch('app.campercontrol.com:5050/training_event/'+id,info )
   }


   deletTraining(id) {
    return this.http.delete('app.campercontrol.com:5050/staff_unsubscribe/'+id, )
   }
   //eventos
   getTrainingEvent() {
    return this.http.get('app.campercontrol.com:5050/training_event/' )
   }

   postTrainingPost(info: any) {
    return this.http.post('app.campercontrol.com:5050/training_event', info)
   }
   updateTrainingEvent(info,id) {
    return this.http.patch('app.campercontrol.com:5050/training_event/'+id,info )
   }
   deletTrainingEvents(id) {
    return this.http.delete('app.campercontrol.com:5050/staff_unsubscribe_training/'+id, )
   }
   

   public getBauch(camper_id :any,capm_id){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get('app.campercontrol.com:5050/payment_boucher/' + camper_id+"/"+capm_id, {headers,responseType: 'blob' as 'json'} )
   }


   getEventos(){
    return this.http.get('app.campercontrol.com:5050/training_event/' )
   }


   get_temporada(){
    return this.http.get('app.campercontrol.com:5050/season/');
  }
  post_temporada(data){
    return this.http.post('app.campercontrol.com:5050/season/',data);
  }
  patch_temp(data,id){
    return this.http.patch('app.campercontrol.com:5050/season/'+id,data);
  }

  delet_temp(id){
    return this.http.delete('app.campercontrol.com:5050/delete/season/'+id);
  }
  
  

}
