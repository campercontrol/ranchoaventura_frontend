import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient)  { }


  getAgrupaciones(){
    return this.http.get(' https://api-dev.kincamp.com/groupings/')
  }
  postAgrupaciones(data:any){
    return this.http.post(' https://api-dev.kincamp.com/groupings/',data)
  }
  typgetAgrupaciones(){
    return this.http.get(' https://api-dev.kincamp.com/grouping_types/')
  }

  updateAgrupaciones(info:any,id){
    return this.http.patch(' https://api-dev.kincamp.com/groupings/'+id,info)
  }

  deletGruping(id){
    return this.http.delete(' https://api-dev.kincamp.com/groupings/'+id)

  }

  getAgrupacionesType(){
    return this.http.get(' https://api-dev.kincamp.com/grouping_types/')
  }
}
