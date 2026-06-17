import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupingService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient)  { }
  getCamper(id){
    return this.http.get(this.apiUrl+'/camps/'+id+'/groupings/campers')
  }
  createGroup(data){
    return this.http.post(this.apiUrl+'/grouping_camps/',data)
  }
  editraCapcidadMaxima(id,data){
    return this.http.put(this.apiUrl+'/grouping_camps/'+id,data)
  }

  getGruposInscritos(id){
    return this.http.get(this.apiUrl+'/camps/'+id+'/groupings')

  }
  getCampersInscritos(id){
    return this.http.get(this.apiUrl+'/groupings/' + id +'/available_campers')

  }
  campersInscritos(data){
    return this.http.post(this.apiUrl+'/grouping_campers/',data)

  }

  deletGruping(id){

    return this.http.delete(this.apiUrl+'/grouping_camper/'+id)

  }
}
