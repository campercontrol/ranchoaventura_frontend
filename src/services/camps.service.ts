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



  setCamps(info:any,id){
    return this.http.post('http://142.93.12.234:8000/camper/subscribe/camps/?camper_id='+id,info)
  }

  preguntasCargosExtras(info:any){
    return this.http.post('http://142.93.12.234:8000/camper/extras/camp/',info)

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
  extras(pregunta){
    return this.http.patch('http://142.93.12.234:8000/camper_extra_charges',pregunta)
  }
  answer(pregunta){
    return this.http.patch('http://142.93.12.234:8000/camper_extra_answers',pregunta)
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

  createEmail(a){
    return this.http.post('http://142.93.12.234:8000/mailing/send/email/',a)
  }
  getCamps() {
    return this.http.get('http://142.93.12.234:8000/camp/')
 }
 getCampacitaciones() {
  return this.http.get('http://142.93.12.234:8000/mailing/training/event/')
}

 setCargosPregustas(id,a){
  return this.http.post('http://142.93.12.234:8000/camper/extras/camp/?camper_id='+id,a)

 }
 getParticipantes(camper,staff,escuela,d) {
  return this.http.post('http://142.93.12.234:8000/mailing/send/campaign/camps/?campers='+camper+'&staffs='+staff +'&school='+escuela,d)
}
getParticipantesCapacitaciones(id) {
  return this.http.get('http://142.93.12.234:8000/mailing/send/campaign/training/?training_id='+id)
}
getProspectos(id) {
  return this.http.get('http://142.93.12.234:8000/mailing/send/campaign/candidates/?season_id='+id)
}

getParticipantesMultiplesCamps(info:any) {
  return this.http.post('http://142.93.12.234:8000/mailing/send/campaign/camps/?campers=true&staffs=true&school=true',info)
}
}
