import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmitipoAgrupacionesService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient)  { }


  getAgrupaciones(){
    return this.http.get(this.apiUrl+'/grouping_types/')
  }
  postAgrupaciones(data:any){
    return this.http.post(this.apiUrl+'/grouping_types/',data)
  }

  updateAgrupaciones(info:any,id){
    return this.http.put(this.apiUrl+'/grouping_types/'+id,info)
  }

  deletGruping(id){
    return this.http.delete(this.apiUrl+'/grouping_types/'+id)

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



  deletComments(id){
    let b:any = []
    return  b;
  }
}
