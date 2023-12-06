import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrofeosService {

  constructor(private http:HttpClient) { }

  setTrofeos(data){
    return this.http.post('http://142.93.12.234:8000/trophy',data);
  }
  editarTrofeos(data,id){
    return this.http.patch('http://142.93.12.234:8000/trophy/'+id,data);
  }
  getTrofeos(){
    return this.http.get('http://142.93.12.234:8000/trophy');
  }
  getTemporada(){
    return this.http.get('http://142.93.12.234:8000/season');
  }
}
