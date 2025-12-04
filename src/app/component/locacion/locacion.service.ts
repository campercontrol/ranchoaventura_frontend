import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {

  constructor(private http: HttpClient) { }

  getSchool(){
    return this.http.get('https://api.ranchoaventuramexico.com/location/');

   }
   postSchool(info){
    return this.http.post('https://api.ranchoaventuramexico.com/location/',info);
   }
   updateSchool(a:any,id){
    return this.http.patch('https://api.ranchoaventuramexico.com/location/'+id,a);
  }
  deleteSchool(id){
    return this.http.delete('https://api.ranchoaventuramexico.com/delete_location/'+id);
  }
}
