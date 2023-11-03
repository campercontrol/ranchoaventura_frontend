import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCampsService {

  constructor(private http:HttpClient) { }

  getSede(){
    return this.http.get('http://64.227.16.165:8000//location');
  }
  getTemporada(){
    return this.http.get('http://64.227.16.165:8000//season');
  }
  gerSchool(){
    return this.http.get('http://64.227.16.165:8000//school');
  }
  getcurrency(){
    return this.http.get('http://64.227.16.165:8000//currency');
  }
  postCamp(a:any){
    return this.http.post('http://64.227.16.165:8000//camp/',a);
  }
  patchCamp(id,a:any){
    return this.http.patch('http://64.227.16.165:8000//camp/'+id,a);
  }
  getCamp( ){
    return this.http.get('http://64.227.16.165:8000//active_camp/');
  }
  getCampId( id:any){
    return this.http.get('http://64.227.16.165:8000//camp/'+id);
  }
}
