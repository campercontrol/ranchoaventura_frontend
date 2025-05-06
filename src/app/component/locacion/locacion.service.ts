import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {

  constructor(private http: HttpClient) { }

  getSchool(){
    return this.http.get('app.campercontrol.com:5050/location/');

   }
   postSchool(info){
    return this.http.post('app.campercontrol.com:5050/location/',info);
   }
   updateSchool(a:any,id){
    return this.http.patch('app.campercontrol.com:5050/location/'+id,a);
  }
  deleteSchool(id){
    return this.http.delete('app.campercontrol.com:5050/delete_location/'+id);
  }
}
