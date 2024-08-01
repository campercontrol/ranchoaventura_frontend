import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmiService {

  constructor(private http:HttpClient)  { }


  getCampers(){
    return this.http.get('http://142.93.12.234:8000/camper/')
  }
  getUsers(){
    return this.http.get('http://142.93.12.234:8000/usuario?is_active=true')
  }

  getComments(){
    return this.http.get('http://142.93.12.234:8000/camper_comment/')
  }
  postComments(info:any){
    return this.http.post('http://142.93.12.234:8000/camper_comment/',info)
  }
  updateComments(info:any,id){
    return this.http.patch('http://142.93.12.234:8000/camper_comment/'+id,info)
  }

  getTempletMasive(){
    return this.http.get('http://142.93.12.234:8000/mailing/template/massive/')
  }
  getTempletSystem(){
    return this.http.get('http://142.93.12.234:8000/mailing/template/system/')
  }
  getCorreos(){
    return this.http.get('http://142.93.12.234:8000/mailing/campaign/')
  }
  getCorreosInfo(id){
    return this.http.get('http://142.93.12.234:8000/mailing/campaign_info/'+id)
  }

  
  createTemplate(data){
    return this.http.post('http://142.93.12.234:8000/email/template/',data)

  }

  getPlantilla(idioma= 'es'){
    return this.http.get('http://142.93.12.234:8000/get/mailing/template/'+idioma)

  }

  getPlantillSelect(id:any){
    return this.http.get('http://142.93.12.234:8000/email/system/template/'+id)

  }
  getPlantillSelectMaisva(id:any){
    return this.http.get('http://142.93.12.234:8000/email/massive/template/'+id)

  }

  getcorreoEnviados(id:any){
    return this.http.get('http://142.93.12.234:8000/mailing/campaign/'+id)

  }

  patchPlantilla(id:any,info){
    return this.http.patch('http://142.93.12.234:8000/email/template/'+id,info)

  }

  delet(id:any){
    return this.http.delete('http://142.93.12.234:8000/delete_email_template/'+id)

  }



  deletComments(id){
    let b:any = []
    return  b;
  }
}
