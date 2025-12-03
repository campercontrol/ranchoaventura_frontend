import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChekpointService {

  constructor(private http: HttpClient) { }

  postchekpoint(info){
    return this.http.post('https://api.kincamp.com/camp_checkpoint/',info)
  }
  getCheckPonitTable(id){
    return this.http.get('https://api.kincamp.com/camp_checkpoint_by_camp/'+id)
  }
  updatecheckPoint(idCchackpoint,a){
    return this.http.patch('https://api.kincamp.com/camp_checkpoint/'+idCchackpoint,a)

  }
  deletePoint(idCchackpoint){
    return this.http.delete('https://api.kincamp.com/delete_camp_checkpoint/'+idCchackpoint)

  }
  getListaCheckpoint(){
    return this.http.get('https://api.kincamp.com/camp_checkpoint/')

  }
  getInfoCamp(id){
    return this.http.get('https://api.kincamp.com/camp/'+id)
  }
  getCampscheckss(id){
    return this.http.get('https://api.kincamp.com/camp_checkpoint_module/'+id)

  }
  inscribir(a){
    return this.http.post('https://api.kincamp.com/camper_checkpoint/',a)

  }
}
