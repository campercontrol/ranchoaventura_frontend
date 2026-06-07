import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateCampsService {

  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiUrl;

  getSede(){
    return this.http.get(this.apiUrl+'/location/');
  }
  getTemporada(){
    return this.http.get(this.apiUrl+'/season/');
  }
  gerSchool(){
    return this.http.get(this.apiUrl+'/school/');
  }
  getcurrency(){
    return this.http.get(this.apiUrl+'/currency/');
  }
  postCamp(a:any){
    return this.http.post(this.apiUrl+'/camp/',a);
  }
  patchCamp(id,a:any){
    return this.http.patch(this.apiUrl+'/camp/'+id,a);
  }
  getCamp( page=1,per_page=50){
    return this.http.get(this.apiUrl+'/active_camp/'+'?page='+page+'&per_page='+per_page+'&order=desc');
  }
  getCampId( id:any){
    return this.http.get(this.apiUrl+'/camp/'+id);
  }


  get_temporada(){
    return this.http.get(this.apiUrl+'/season/');
  }
  searchCamps(name: string, location: any, school: any, page: number = 1, perPage: number = 10) {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (location) params.append('location', location);
    if (school) params.append('school', school);
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    params.append('order', 'desc');

    return this.http.get(this.apiUrl+`/search/active_camp/?${params.toString()}`);
  }
}
