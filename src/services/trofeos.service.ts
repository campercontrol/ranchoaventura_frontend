import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrofeosService {

  constructor(private http:HttpClient) { }

  setTrofeos(data){
    return this.http.post('http://api-dev.kincamp.com/trophy',data);
  }
  editarTrofeos(data,id){
    return this.http.patch('http://api-dev.kincamp.com/trophy/'+id,data);
  }
  getTrofeos(){
    return this.http.get('http://api-dev.kincamp.com/trophy');
  }
  getTemporada(){
    return this.http.get('http://api-dev.kincamp.com/season');
  }
}
