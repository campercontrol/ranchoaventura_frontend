import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCampsService {

  constructor(private http:HttpClient) { }

  getSede(){
    return this.http.get('http://142.93.12.234:8000/location');
  }
  getTemporada(){
    return this.http.get('http://142.93.12.234:8000/season');
  }
  gerSchool(){
    return this.http.get('http://142.93.12.234:8000/school');
  }
  getcurrency(){
    return this.http.get('http://142.93.12.234:8000/currency');
  }
  postCamp(a:any){
    return this.http.post('http://142.93.12.234:8000/camp/',a);
  }
  patchCamp(id,a:any){
    return this.http.patch('http://142.93.12.234:8000/camp/'+id,a);
  }
  getCamp( page=1,per_page=10){
    return this.http.get('http://142.93.12.234:8000/active_camp/'+'?page='+page+'&per_page='+per_page+'&order=desc');
  }
  getCampId( id:any){
    return this.http.get('http://142.93.12.234:8000/camp/'+id);
  }


  get_temporada(){
    return this.http.get('http://142.93.12.234:8000/season/');
  }
}
