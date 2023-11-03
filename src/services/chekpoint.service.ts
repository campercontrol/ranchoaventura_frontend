import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChekpointService {

  constructor(private http: HttpClient) { }

  postchekpoint(info){
    return this.http.post('http://64.227.16.165:8000//camp_checkpoint/',info)
  }
  getCheckPonitTable(id){
    return this.http.get('http://64.227.16.165:8000//camp_checkpoint_by_camp/'+id)
  }
  updatecheckPoint(idCchackpoint,a){
    return this.http.patch('http://64.227.16.165:8000//camp_checkpoint/'+idCchackpoint,a)

  }
  deletePoint(idCchackpoint){
    return this.http.delete('http://64.227.16.165:8000//delete_camp_checkpoint/'+idCchackpoint)

  }
  getListaCheckpoint(){
    return this.http.get('http://64.227.16.165:8000//camp_checkpoint/')

  }
  getInfoCamp(id){
    return this.http.get('http://64.227.16.165:8000//camp/'+id)
  }
  getCampscheckss(id){
    return this.http.get('http://64.227.16.165:8000//camp_checkpoint_module/'+id)

  }
  inscribir(a){
    return this.http.post('http://64.227.16.165:8000//camper_checkpoint/',a)

  }
}
