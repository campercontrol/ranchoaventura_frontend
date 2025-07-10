import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmitipoAgrupacionesService {

  constructor(private http:HttpClient)  { }


  getAgrupaciones(){
    return this.http.get('http://api-dev.kincamp.com/grouping_types/')
  }
  postAgrupaciones(data:any){
    return this.http.post('http://api-dev.kincamp.com/grouping_types/',data)
  }

  updateAgrupaciones(info:any,id){
    return this.http.put('http://api-dev.kincamp.com/grouping_types/'+id,info)
  }

  deletGruping(id){
    return this.http.delete('http://api-dev.kincamp.com/grouping_types/'+id)

  }


  
  createTemplate(data){
    return this.http.post('http://api-dev.kincamp.com/email/template/',data)

  }

  getPlantilla(idioma= 'es'){
    return this.http.get('http://api-dev.kincamp.com/get/mailing/template/'+idioma)

  }

  getPlantillSelect(id:any){
    return this.http.get('http://api-dev.kincamp.com/email/system/template/'+id)

  }
  getPlantillSelectMaisva(id:any){
    return this.http.get('http://api-dev.kincamp.com/email/massive/template/'+id)

  }

  getcorreoEnviados(id:any){
    return this.http.get('http://api-dev.kincamp.com/mailing/campaign/'+id)

  }

  patchPlantilla(id:any,info){
    return this.http.patch('http://api-dev.kincamp.com/email/template/'+id,info)

  }



  deletComments(id){
    let b:any = []
    return  b;
  }
}
