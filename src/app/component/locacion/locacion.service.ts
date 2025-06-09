import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {

  constructor(private http: HttpClient) { }

  getSchool(){
    return this.http.get('https://api-dev.campercontrol.com/location/');

   }
   postSchool(info){
    return this.http.post('https://api-dev.campercontrol.com/location/',info);
   }
   updateSchool(a:any,id){
    return this.http.patch('https://api-dev.campercontrol.com/location/'+id,a);
  }
  deleteSchool(id){
    return this.http.delete('https://api-dev.campercontrol.com/delete_location/'+id);
  }
}
