import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmiService {

  constructor(private http:HttpClient)  { }


  getCampers(){
    return this.http.get('app.campercontrol.com:5050/camper/')
  }
  getUsers(){
    return this.http.get('app.campercontrol.com:5050/usuario?is_active=true')
  }

  getComments(){
    return this.http.get('app.campercontrol.com:5050/camper_comment/')
  }
  postComments(info:any){
    return this.http.post('app.campercontrol.com:5050/camper_comment/',info)
  }
  updateComments(info:any,id){
    return this.http.patch('app.campercontrol.com:5050/camper_comment/'+id,info)
  }

  getTempletMasive(){
    return this.http.get('app.campercontrol.com:5050/mailing/template/massive/')
  }
  getTempletSystem(){
    return this.http.get('app.campercontrol.com:5050/mailing/template/system/')
  }
  getCorreos(){
    return this.http.get('app.campercontrol.com:5050/mailing/campaign/')
  }
  getCorreosInfo(id){
    return this.http.get('app.campercontrol.com:5050/mailing/campaign_info/'+id)
  }

  
  createTemplate(data){
    return this.http.post('app.campercontrol.com:5050/email/template/',data)

  }

  getPlantilla(idioma= 'es'){
    return this.http.get('app.campercontrol.com:5050/get/mailing/template/'+idioma)

  }

  getPlantillSelect(id:any){
    return this.http.get('app.campercontrol.com:5050/email/system/template/'+id)

  }
  getPlantillSelectMaisva(id:any){
    return this.http.get('app.campercontrol.com:5050/email/massive/template/'+id)

  }

  getcorreoEnviados(id:any){
    return this.http.get('app.campercontrol.com:5050/mailing/campaign/'+id)

  }

  patchPlantilla(id:any,info){
    return this.http.patch('app.campercontrol.com:5050/email/template/'+id,info)

  }

  delet(id:any){
    return this.http.delete('app.campercontrol.com:5050/delete_email_template/'+id)

  }

  gaetCampsSchoolProx(id:any){
    return this.http.get('app.campercontrol.com:5050/school/'+id+'/upcoming_camps')

  }

  gaetCampsSchoolAnteriores(id:any){
    return this.http.get('app.campercontrol.com:5050/school/'+id+'/past_camps')
  }


  deletComments(id){
    let b:any = []
    return  b;
  }
}
