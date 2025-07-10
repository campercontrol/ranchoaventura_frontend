import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {

  constructor(private http: HttpClient) { }

  getSchool(){
    return this.http.get('http://api-dev.kincamp.com/location/');

   }
   postSchool(info){
    return this.http.post('http://api-dev.kincamp.com/location/',info);
   }
   updateSchool(a:any,id){
    return this.http.patch('http://api-dev.kincamp.com/location/'+id,a);
  }
  deleteSchool(id){
    return this.http.delete('http://api-dev.kincamp.com/delete_location/'+id);
  }
}
