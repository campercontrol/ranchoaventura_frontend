import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCampsService {

  constructor(private http:HttpClient) { }

  getSede(){
    return this.http.get('app.campercontrol.com:5050/location');
  }
  getTemporada(){
    return this.http.get('app.campercontrol.com:5050/season');
  }
  gerSchool(){
    return this.http.get('app.campercontrol.com:5050/school');
  }
  getcurrency(){
    return this.http.get('app.campercontrol.com:5050/currency');
  }
  postCamp(a:any){
    return this.http.post('app.campercontrol.com:5050/camp/',a);
  }
  patchCamp(id,a:any){
    return this.http.patch('app.campercontrol.com:5050/camp/'+id,a);
  }
  getCamp( page=1,per_page=10){
    return this.http.get('app.campercontrol.com:5050/active_camp/'+'?page='+page+'&per_page='+per_page+'&order=desc');
  }
  getCampId( id:any){
    return this.http.get('app.campercontrol.com:5050/camp/'+id);
  }


  get_temporada(){
    return this.http.get('app.campercontrol.com:5050/season/');
  }
  searchCamps(name: string, location: any, school: any, page: number = 1, perPage: number = 10) {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (location) params.append('location', location);
    if (school) params.append('school', school);
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    params.append('order', 'desc');

    return this.http.get(`app.campercontrol.com:5050/search/active_camp/?${params.toString()}`);
  }
}
