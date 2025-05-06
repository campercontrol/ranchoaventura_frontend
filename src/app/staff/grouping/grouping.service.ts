import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupingService {

  constructor(private http:HttpClient)  { }
  getCamper(id){
    return this.http.get('app.campercontrol.com:5050/camps/'+id+'/groupings/campers')
  }
  createGroup(data){
    return this.http.post('app.campercontrol.com:5050/grouping_camps',data)
  }
  editraCapcidadMaxima(id,data){
    return this.http.put('app.campercontrol.com:5050/grouping_camps/'+id,data)
  }

  getGruposInscritos(id){
    return this.http.get('app.campercontrol.com:5050/camps/'+id+'/groupings')

  }
  getCampersInscritos(id){
    return this.http.get('app.campercontrol.com:5050/groupings/' + id +'/available_campers')

  }
  campersInscritos(data){
    return this.http.post('app.campercontrol.com:5050/grouping_campers',data)

  }

  deletGruping(id){

    return this.http.delete('app.campercontrol.com:5050/grouping_camper/'+id)

  }
}
