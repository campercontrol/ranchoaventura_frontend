import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmiService {

  constructor(private http:HttpClient)  { }


  getCampers(){
    return this.http.get('https://api.ranchoaventuramexico.com/camper/')
  }
  getUsers(){
    return this.http.get('https://api.ranchoaventuramexico.com/usuario?is_active=true')
  }

  getComments(){
    return this.http.get('https://api.ranchoaventuramexico.com/camper_comment/')
  }
  postComments(info:any){
    return this.http.post('https://api.ranchoaventuramexico.com/camper_comment/',info)
  }
  updateComments(info:any,id){
    return this.http.patch('https://api.ranchoaventuramexico.com/camper_comment/'+id,info)
  }

  getTempletMasive(){
    return this.http.get('https://api.ranchoaventuramexico.com/mailing/template/massive/')
  }
  getTempletSystem(){
    return this.http.get('https://api.ranchoaventuramexico.com/mailing/template/system/')
  }
  getCorreos(){
    return this.http.get('https://api.ranchoaventuramexico.com/mailing/campaign/')
  }
  getCorreosInfo(id){
    return this.http.get('https://api.ranchoaventuramexico.com/mailing/campaign_info/'+id)
  }

  
  createTemplate(data){
    return this.http.post('https://api.ranchoaventuramexico.com/email/template/',data)

  }

  getPlantilla(idioma= 'es'){
    return this.http.get('https://api.ranchoaventuramexico.com/get/mailing/template/'+idioma)

  }

  getPlantillSelect(id:any){
    return this.http.get('https://api.ranchoaventuramexico.com/email/system/template/'+id)

  }
  getPlantillSelectMaisva(id:any){
    return this.http.get('https://api.ranchoaventuramexico.com/email/massive/template/'+id)

  }

  getcorreoEnviados(id:any){
    return this.http.get('https://api.ranchoaventuramexico.com/mailing/campaign/'+id)

  }

  patchPlantilla(id:any,info){
    return this.http.patch('https://api.ranchoaventuramexico.com/email/template/'+id,info)

  }

  delet(id:any){
    return this.http.delete('https://api.ranchoaventuramexico.com/delete_email_template/'+id)

  }

  gaetCampsSchoolProx(id:any){
    return this.http.get('https://api.ranchoaventuramexico.com/school/'+id+'/upcoming_camps/')

  }

  gaetCampsSchoolAnteriores(id:any){
    return this.http.get('https://api.ranchoaventuramexico.com/school/'+id+'/past_camps/')
  }


  deletComments(id){
    let b:any = []
    return  b;
  }
}
