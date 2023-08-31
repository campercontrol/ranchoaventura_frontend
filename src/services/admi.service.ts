import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmiService {

  constructor(private http:HttpClient)  { }


  getCampers(){
    return this.http.get('http://142.93.12.234:8000/camper/')
  }
  getUsers(){
    return this.http.get('http://142.93.12.234:8000/usuario?is_active=true')
  }

  getComments(){
    return this.http.get('http://142.93.12.234:8000/camper_comment/')
  }
  postComments(info:any){
    return this.http.post('http://142.93.12.234:8000/camper_comment/',info)
  }
  updateComments(info:any,id){
    return this.http.patch('http://142.93.12.234:8000/camper_comment/'+id,info)
  }

  deletComments(id){
    let b:any = []
    return  b;
  }
}
