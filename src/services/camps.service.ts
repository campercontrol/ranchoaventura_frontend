import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampsService {

  constructor(private http:HttpClient) { }

  getCampsDisponibles(id){
    return this.http.get('http://142.93.12.234:8000/get_camps_for_camper/'+id)
  }

  setCamps(info:{}){
    return this.http.post('http://142.93.12.234:8000/subscribe_camp/',info)
  }

  getPreguntas(preguntas:number){
    return this.http.get('http://142.93.12.234:8000/extra_question_by_camp/'+preguntas)

  }
  getCargosExtras(cargo:number){
    return this.http.get('http://142.93.12.234:8000/extra_charge_by_camp/'+cargo)

  }
}
