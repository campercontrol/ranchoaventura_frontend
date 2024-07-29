import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {

  constructor(private http: HttpClient) { }

  getSchool(){
    return this.http.get('http://142.93.12.234:8000/location/');

   }
   postSchool(info){
    return this.http.post('http://142.93.12.234:8000/location/',info);
   }
   updateSchool(a:any,id){
    return this.http.patch('http://142.93.12.234:8000/location/'+id,a);
  }
  deleteSchool(id){
    return this.http.delete('http://142.93.12.234:8000/delete_location/'+id);
  }
}
