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
  setPreguntas(id,pregunta){
    return this.http.patch('http://142.93.12.234:8000/camper_extra_answer/'+id,pregunta)
  }
  setPagos(pregunta){
    return this.http.post('http://142.93.12.234:8000/camper_extra_charge/',pregunta)
  }
  getDashbord(id=18){
    return this.http.get('http://142.93.12.234:8000/staff_dashboard/'+id)

  }

  getCamp(id){
    return this.http.get('http://142.93.12.234:8000/camp/'+id)
  }

  inscribirCappStaff(a){
    return this.http.post('http://142.93.12.234:8000/staff_volunteer/',a)
  }
}
