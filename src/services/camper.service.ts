import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamperService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }


  getCatalogos(idioma:string = 'es'){
    return this.http.get(this.apiUrl+'/camper_form/es')
  }

  setCamper(info:{}){
    return this.http.post(this.apiUrl+'/camper/',info)
   }
   

   lengua(){
    return this.http.get(this.apiUrl+'/src/assets/json/lengua.json');
   }

   prueba(){
    return this.http.get(this.apiUrl+'/camper_complete/13/es');
   }

   createCamper(info:{}){
     return this.http.post(this.apiUrl+'/parent/',info)
   }
   setPhoto(info:any):Observable<any>{
    
    console.log(info);
    
    return this.http.post(this.apiUrl+'/photo/upload_image',info)
   }
   setpdf(info:any):Observable<any>{
    
    //console.log(info);
    
    return this.http.post(this.apiUrl+'/staff/upload_cv',info)
   }

   getCamper(id:any):Observable<any>{
    return this.http.get(this.apiUrl+'/camper_complete/'+id+'/es')
   }
   getSearchParen(id:any):Observable<any>{
    return this.http.get(this.apiUrl+'/parent/'+id)
   }
   updateCamper(id:any,info:{}){
    return this.http.patch(this.apiUrl+'/camper/'+id,info)

   }
   deletCamper(id:any){
    return this.http.delete(this.apiUrl+'/delete_camper/'+id,{})

   }

   getHijos(id){
    return this.http.get(this.apiUrl+'/parent_dashboard/'+id)

   }

   informacionCampamento(camper_id :any, camp_id :any){
    return this.http.get(this.apiUrl+'/parent_camper_in_camp/' + camper_id +'/'+camp_id)
   }
   getPerfil(camper_id :any){
    return this.http.get(this.apiUrl+'/camper_profile/' + camper_id )
   }

   getCapsT(camper_id :any){
    return this.http.get(this.apiUrl+'/camper_dashboard/' + camper_id )
   }
   postTraining(info: any) {
    return this.http.post(this.apiUrl+'/training/', info)
   }
   postEventos(info: any) {
    return this.http.post(this.apiUrl+'/training_event/', info)
   }
   getTraining() {
    return this.http.get(this.apiUrl+'/training/' )
   }
   getTemporadas() {
    return this.http.get(this.apiUrl+'/season/' )
   }
   updateTraining(info,id) {
    return this.http.patch(this.apiUrl+'/training/'+id,info )
   }

   updateEventos(info,id) {
    return this.http.patch(this.apiUrl+'/training_event/'+id,info )
   }


   deletTraining(id) {
    return this.http.delete(this.apiUrl+'/staff_unsubscribe/'+id, )
   }
   //eventos
   getTrainingEvent() {
    return this.http.get(this.apiUrl+'/training_event/' )
   }

   postTrainingPost(info: any) {
    return this.http.post(this.apiUrl+'/training_event/', info)
   }
   updateTrainingEvent(info,id) {
    return this.http.patch(this.apiUrl+'/training_event/'+id,info )
   }
   deletTrainingEvents(id) {
    return this.http.delete(this.apiUrl+'/staff_unsubscribe_training/'+id, )
   }
   

   public getBauch(camper_id :any,capm_id){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.apiUrl+'/payment_boucher/' + camper_id+"/"+capm_id, {headers,responseType: 'blob' as 'json'} )
   }


   getEventos(){
    return this.http.get(this.apiUrl+'/training_event/' )
   }

   getPagos(idCamp,idCamper){
    return this.http.get(this.apiUrl+'/parent_camper_in_camp/'+idCamper+'/'+idCamp )
    }



   get_temporada(){
    return this.http.get(this.apiUrl+'/season/');
  }
  post_temporada(data){
    return this.http.post(this.apiUrl+'/season/',data);
  }
  patch_temp(data,id){
    return this.http.patch(this.apiUrl+'/season/'+id,data);
  }

  delet_temp(id){
    return this.http.delete(this.apiUrl+'/delete/season/'+id);
  }
  
  

}
