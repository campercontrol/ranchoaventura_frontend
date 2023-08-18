import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampsVistaService {

  constructor(private http:HttpClient) {

  }

  getInfoCamp(id){
      return this.http.get('http://142.93.12.234:8000/staff/camp/'+id);
  }
  getRolSatff( ){
    return this.http.get('http://142.93.12.234:8000/staff_role/');
  }
  getListaSatff(){
    return this.http.get('http://142.93.12.234:8000/staff/');
  }

  aceptarStaff(id,info){
    return this.http.post('http://142.93.12.234:8000/accept/staff/camp/'+id,info)
  }
  asignarRolStaff(id,rolid,info){
    return this.http.post('http://142.93.12.234:8000/update/staff/role/'+id+'/'+rolid,info)
  }


}
