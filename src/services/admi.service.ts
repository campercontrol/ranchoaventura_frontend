import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmiService {

  constructor(private http:HttpClient)  { }
  private apiUrl = environment.apiUrl;


  getCampers(){
    return this.http.get(this.apiUrl+'/camper/')
  }
  getUsers(){
    return this.http.get(this.apiUrl+'/usuario?is_active=true')
  }

  getComments(){
    return this.http.get(this.apiUrl+'/camper_comment/')
  }
  postComments(info:any){
    return this.http.post(this.apiUrl+'/camper_comment/',info)
  }
  updateComments(info:any,id){
    return this.http.patch(this.apiUrl+'/camper_comment/'+id,info)
  }

  getTempletMasive(){
    return this.http.get(this.apiUrl+'/mailing/template/massive/')
  }
  getTempletSystem(){
    return this.http.get(this.apiUrl+'/mailing/template/system/')
  }
  getCorreos(){
    return this.http.get(this.apiUrl+'/mailing/campaign/')
  }
  getCorreosInfo(id){
    return this.http.get(this.apiUrl+'/mailing/campaign_info/'+id)
  }

  
  createTemplate(data){
    return this.http.post(this.apiUrl+'/email/template/',data)

  }

  getPlantilla(idioma= 'es'){
    return this.http.get(this.apiUrl+'/get/mailing/template/'+idioma)

  }

  getPlantillSelect(id:any){
    return this.http.get(this.apiUrl+'/email/system/template/'+id)

  }
  getPlantillSelectMaisva(id:any){
    return this.http.get(this.apiUrl+'/email/massive/template/'+id)

  }

  getcorreoEnviados(id:any){
    return this.http.get(this.apiUrl+'/mailing/campaign/'+id)

  }

  patchPlantilla(id:any,info){
    return this.http.patch(this.apiUrl+'/email/template/'+id,info)

  }

  delet(id:any){
    return this.http.delete(this.apiUrl+'/delete_email_template/'+id)

  }

  gaetCampsSchoolProx(id:any){
    return this.http.get(this.apiUrl+'/school/'+id+'/upcoming_camps/')

  }

  gaetCampsSchoolAnteriores(id:any){
    return this.http.get(this.apiUrl+'/school/'+id+'/past_camps/')
  }


  deletComments(id){
    let b:any = []
    return  b;
  }
}
