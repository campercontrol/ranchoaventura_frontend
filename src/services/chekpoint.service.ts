import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChekpointService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postchekpoint(info){
    return this.http.post(this.apiUrl+'/camp_checkpoint/',info)
  }
  getCheckPonitTable(id){
    return this.http.get(this.apiUrl+'/camp_checkpoint_by_camp/'+id)
  }
  updatecheckPoint(idCchackpoint,a){
    return this.http.patch(this.apiUrl+'/camp_checkpoint/'+idCchackpoint,a)

  }
  deletePoint(idCchackpoint){
    return this.http.delete(this.apiUrl+'/delete_camp_checkpoint/'+idCchackpoint)

  }
  getListaCheckpoint(){
    return this.http.get(this.apiUrl+'/camp_checkpoint/')

  }
  getInfoCamp(id){
    return this.http.get(this.apiUrl+'/camp/'+id)
  }
  getCampscheckss(id){
    return this.http.get(this.apiUrl+'/camp_checkpoint_module/'+id)

  }
  inscribir(a){
    return this.http.post(this.apiUrl+'/camper_checkpoint/',a)

  }
}
