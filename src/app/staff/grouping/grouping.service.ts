import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupingService {

  constructor(private http:HttpClient)  { }
  getCamper(id){
    return this.http.get('http://api-dev.kincamp.com/camps/'+id+'/groupings/campers')
  }
  createGroup(data){
    return this.http.post('http://api-dev.kincamp.com/grouping_camps',data)
  }
  editraCapcidadMaxima(id,data){
    return this.http.put('http://api-dev.kincamp.com/grouping_camps/'+id,data)
  }

  getGruposInscritos(id){
    return this.http.get('http://api-dev.kincamp.com/camps/'+id+'/groupings')

  }
  getCampersInscritos(id){
    return this.http.get('http://api-dev.kincamp.com/groupings/' + id +'/available_campers')

  }
  campersInscritos(data){
    return this.http.post('http://api-dev.kincamp.com/grouping_campers',data)

  }

  deletGruping(id){

    return this.http.delete('http://api-dev.kincamp.com/grouping_camper/'+id)

  }
}
