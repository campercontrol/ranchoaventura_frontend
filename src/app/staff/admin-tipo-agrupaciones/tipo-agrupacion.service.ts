import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmitipoAgrupacionesService {

  constructor(private http:HttpClient)  { }


  getAgrupaciones(){
    return this.http.get('http://142.93.12.234:8000/grouping_types/')
  }
  postAgrupaciones(data:any){
    return this.http.post('http://142.93.12.234:8000/grouping_types/',data)
  }

  updateAgrupaciones(info:any,id){
    return this.http.patch('http://142.93.12.234:8000/grouping_types/'+id,info)
  }

  deletGruping(id){
    return this.http.delete('http://142.93.12.234:8000/grouping_types/'+id)

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



  deletComments(id){
    let b:any = []
    return  b;
  }
}
