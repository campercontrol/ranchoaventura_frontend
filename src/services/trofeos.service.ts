import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrofeosService {

  constructor(private http:HttpClient) { }

  setTrofeos(data){
    return this.http.post('app.campercontrol.com:5050/trophy',data);
  }
  editarTrofeos(data,id){
    return this.http.patch('app.campercontrol.com:5050/trophy/'+id,data);
  }
  getTrofeos(){
    return this.http.get('app.campercontrol.com:5050/trophy');
  }
  getTemporada(){
    return this.http.get('app.campercontrol.com:5050/season');
  }
}
