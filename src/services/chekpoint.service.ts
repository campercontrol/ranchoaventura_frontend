import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChekpointService {

  constructor(private http: HttpClient) { }

  postchekpoint(info){
    return this.http.post('app.campercontrol.com:5050/camp_checkpoint/',info)
  }
  getCheckPonitTable(id){
    return this.http.get('app.campercontrol.com:5050/camp_checkpoint_by_camp/'+id)
  }
  updatecheckPoint(idCchackpoint,a){
    return this.http.patch('app.campercontrol.com:5050/camp_checkpoint/'+idCchackpoint,a)

  }
  deletePoint(idCchackpoint){
    return this.http.delete('app.campercontrol.com:5050/delete_camp_checkpoint/'+idCchackpoint)

  }
  getListaCheckpoint(){
    return this.http.get('app.campercontrol.com:5050/camp_checkpoint/')

  }
  getInfoCamp(id){
    return this.http.get('app.campercontrol.com:5050/camp/'+id)
  }
  getCampscheckss(id){
    return this.http.get('app.campercontrol.com:5050/camp_checkpoint_module/'+id)

  }
  inscribir(a){
    return this.http.post('app.campercontrol.com:5050/camper_checkpoint/',a)

  }
}
