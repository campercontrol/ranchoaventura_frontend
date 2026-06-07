import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { 
      
  }
  prospectos(prospecto:any){
    console.log(prospecto);
    
    return this.http.post(this.apiUrl+'/prospect/',prospecto)
  }
  getProspectosSearch(filters: any) {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });
  
    return this.http.get<any>(this.apiUrl+'/search_prospect/', { params });
  }
  
  editStaff(a,id){
    return this.http.patch(this.apiUrl+'/staff/complete/'+id,a)
  }
  infoPerfil(id,idioma = 'es'){
    return this.http.get(this.apiUrl+'/staff/complete/'+id+'/'+idioma)
  }

  getPerfilStaff(id,idioma = 'es'){
    return this.http.get(this.apiUrl+'/staff/profile/'+id+'/'+idioma)
  }

  getProspectos(page=1,per_page =10){
    return this.http.get(this.apiUrl+'/prospect/?page='+page+'&per_page='+per_page+'&order=desc')

  }
  aceptarProspectos(id){
    return this.http.patch(this.apiUrl+'/accept_prospect/'+id,{})

  }
  cancelarParticipacio(id){
    return this.http.delete(this.apiUrl+'/staff_unsubscribe/'+id)

  }

  getPerfil(id ){
    return this.http.get(this.apiUrl+'/staff/'+id)
  }
  

  reportProspecto( ){
    return this.http.post(this.apiUrl+'/prospects/report/general',{})
  }
  
  createComment(info){
    return this.http.post(this.apiUrl+'/staff_comment/',info)
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
    getCamp( page=1,per_page=50){
      return this.http.get(this.apiUrl+'/active_camp/'+'?page='+page+'&per_page='+per_page+'&order=desc');
    }
}
