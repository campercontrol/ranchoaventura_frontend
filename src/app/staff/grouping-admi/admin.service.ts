import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient)  { }

  private apiUrl = environment.apiUrl;

  getAgrupaciones(){
    return this.http.get(this.apiUrl+'/groupings/')
  }
  postAgrupaciones(data:any){
    return this.http.post(this.apiUrl+'/groupings/',data)
  }
  typgetAgrupaciones(){
    return this.http.get(this.apiUrl+'/grouping_types/')
  }

  updateAgrupaciones(info:any,id){
    return this.http.patch(this.apiUrl+'/groupings'+id,info)
  }

  deletGruping(id){
    return this.http.delete(this.apiUrl+'/groupings'+id)

  }

  getAgrupacionesType(){
    return this.http.get(this.apiUrl+'/grouping_types/')
  }
}
