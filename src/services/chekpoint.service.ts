import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChekpointService {

  constructor(private http: HttpClient) { }

  postchekpoint(info){
    return this.http.post('http://142.93.12.234:8000/camp_checkpoint/',info)
  }
  getCheckPonitTable(id){
    return this.http.get('http://142.93.12.234:8000/camp_checkpoint_by_camp/'+id)
  }
  updatecheckPoint(idCchackpoint,a){
    return this.http.patch('http://142.93.12.234:8000/camp_checkpoint/'+idCchackpoint,a)

  }
  getListaCheckpoint(){
    return this.http.get('http://142.93.12.234:8000/camp_checkpoint/')

  }
  getInfoCamp(id){
    return this.http.get('http://142.93.12.234:8000/camp/'+id)
  }
}
