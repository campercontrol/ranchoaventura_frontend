import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSchool(){
    return this.http.get(this.apiUrl+'/location/');

   }
   postSchool(info){
    return this.http.post(this.apiUrl+'/location/',info);
   }
   updateSchool(a:any,id){
    return this.http.patch(this.apiUrl+'/location/'+id,a);
  }
  deleteSchool(id){
    return this.http.delete(this.apiUrl+'/delete_location/'+id);
  }
}
