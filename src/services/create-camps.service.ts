import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateCampsService {

  constructor(private http:HttpClient) { }

  getSede(){
    return this.http.get('https://api-dev.campercontrol.com/location');
  }
  getTemporada(){
    return this.http.get('https://api-dev.campercontrol.com/season');
  }
  gerSchool(){
    return this.http.get('https://api-dev.campercontrol.com/school');
  }
  getcurrency(){
    return this.http.get('https://api-dev.campercontrol.com/currency');
  }
  postCamp(a:any){
    return this.http.post('https://api-dev.campercontrol.com/camp/',a);
  }
  patchCamp(id,a:any){
    return this.http.patch('https://api-dev.campercontrol.com/camp/'+id,a);
  }
  getCamp( page=1,per_page=10){
    return this.http.get('https://api-dev.campercontrol.com/active_camp/'+'?page='+page+'&per_page='+per_page+'&order=desc');
  }
  getCampId( id:any){
    return this.http.get('https://api-dev.campercontrol.com/camp/'+id);
  }


  get_temporada(){
    return this.http.get('https://api-dev.campercontrol.com/season/');
  }
  searchCamps(name: string, location: any, school: any, page: number = 1, perPage: number = 10) {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (location) params.append('location', location);
    if (school) params.append('school', school);
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    params.append('order', 'desc');

    return this.http.get(`https://api-dev.campercontrol.com/search/active_camp/?${params.toString()}`);
  }
}
