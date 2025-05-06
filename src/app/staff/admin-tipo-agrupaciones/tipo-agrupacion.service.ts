import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmitipoAgrupacionesService {

  constructor(private http:HttpClient)  { }


  getAgrupaciones(){
    return this.http.get('app.campercontrol.com:5050/grouping_types/')
  }
  postAgrupaciones(data:any){
    return this.http.post('app.campercontrol.com:5050/grouping_types/',data)
  }

  updateAgrupaciones(info:any,id){
    return this.http.put('app.campercontrol.com:5050/grouping_types/'+id,info)
  }

  deletGruping(id){
    return this.http.delete('app.campercontrol.com:5050/grouping_types/'+id)

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



  deletComments(id){
    let b:any = []
    return  b;
  }
}
