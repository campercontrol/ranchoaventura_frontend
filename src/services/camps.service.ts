import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampsService {

  constructor(private http:HttpClient) { }

  getCampsDisponibles(id,school){
    return this.http.get('http://142.93.12.234:8000/get_camps_for_camper/'+id+'/'+school)
  }

  setCamps(info:{}){
    return this.http.post('http://142.93.12.234:8000/subscribe_camp/',info)
  }
}
