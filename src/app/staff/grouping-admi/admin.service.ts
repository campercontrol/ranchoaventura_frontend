import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient)  { }


  getAgrupaciones(){
    return this.http.get('http://142.93.12.234:8000/groupings/')
  }
  postAgrupaciones(data:any){
    return this.http.post('http://142.93.12.234:8000/groupings/',data)
  }
  typgetAgrupaciones(){
    return this.http.get('http://142.93.12.234:8000/grouping_types/')
  }

  updateAgrupaciones(info:any,id){
    return this.http.patch('http://142.93.12.234:8000/groupings/'+id,info)
  }

  deletGruping(id){
    return this.http.delete('http://142.93.12.234:8000/groupings/'+id)

  }

  getAgrupacionesType(){
    return this.http.get('http://142.93.12.234:8000/grouping_types/')
  }
}
