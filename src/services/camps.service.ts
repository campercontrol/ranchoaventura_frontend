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



  setCamps(info:{},id){
    return this.http.post('http://142.93.12.234:8000/camper/subscribe/camps/'+id,info)
  }

  getPreguntas(idCamp:number,idCamper){
    return this.http.get('http://142.93.12.234:8000/extra_answers_camper/'+idCamp+"/"+idCamper)

  }
  getCargosExtras(camperid,campid){
    return this.http.get('http://142.93.12.234:8000/camper_extra_charge_by_camp/'+camperid+'/'+campid)
  }
  setPreguntas(pregunta){
    return this.http.post('http://142.93.12.234:8000/camper/extra_answers/',pregunta)
  }
  setPagos(pregunta){
    return this.http.post('http://142.93.12.234:8000/camper/extra_charges/',pregunta)
  }
  getDashbord(id){
    return this.http.get('http://142.93.12.234:8000/staff_dashboard/'+id)

  }
  deletCamp(idcamper:any,idcamp:any){
    return this.http.post('http://142.93.12.234:8000/unsubscribe_camp/?camp_id='+idcamp+'&camper_id='+idcamper,{})

  }

  getCamp(id){
    return this.http.get('http://142.93.12.234:8000/camp/'+id)
  }

  inscribirCappStaff(a){
    return this.http.post('http://142.93.12.234:8000/staff_volunteer/',a)
  }
  getCamps() {
    return this.http.get('http://142.93.12.234:8000/camp/')
 }
}
