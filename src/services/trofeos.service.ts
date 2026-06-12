import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrofeosService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  setTrofeos(data){
    return this.http.post(this.apiUrl+'/trophy',data);
  }
  editarTrofeos(data,id){
    return this.http.patch(this.apiUrl+'/trophy/'+id,data);
  }
  getTrofeos(){
    return this.http.get(this.apiUrl+'/trophy');
  }
  getTemporada(){
    return this.http.get(this.apiUrl+'/season');
  }
}
