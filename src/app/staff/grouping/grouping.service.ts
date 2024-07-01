import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupingService {

  constructor(private http:HttpClient)  { }
  getCamper(id){
    return this.http.get('http://142.93.12.234:8000/camps/'+id+'/groupings/campers')
  }
  createGroup(data){
    return this.http.post('http://142.93.12.234:8000/grouping_camps',data)
  }
  editraCapcidadMaxima(id,data){
    return this.http.put('http://142.93.12.234:8000/grouping_camps/'+id,data)
  }

  getGruposInscritos(id){
    return this.http.get('http://142.93.12.234:8000/camps/'+id+'/groupings')

  }
  getCampersInscritos(id){
    return this.http.get('http://142.93.12.234:8000/groupings/' + id +'/available_campers')

  }
  campersInscritos(data){
    return this.http.post('http://142.93.12.234:8000/grouping_campers',data)

  }
}
