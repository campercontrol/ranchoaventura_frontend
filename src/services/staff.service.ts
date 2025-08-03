import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http:HttpClient) { 
      
  }
  prospectos(prospecto:any){
    console.log(prospecto);
    
    return this.http.post('https://api.kincamp.com//prospect/',prospecto)
  }
  getProspectosSearch(filters: any) {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });
  
    return this.http.get<any>('https://api.kincamp.com//search_prospect/', { params });
  }
  
  editStaff(a,id){
    return this.http.patch('https://api.kincamp.com//staff/complete/'+id,a)
  }
  infoPerfil(id,idioma = 'es'){
    return this.http.get('https://api.kincamp.com//staff/complete/'+id+'/'+idioma)
  }

  getPerfilStaff(id,idioma = 'es'){
    return this.http.get('https://api.kincamp.com//staff/profile/'+id+'/'+idioma)
  }

  getProspectos(page=1,per_page =10){
    return this.http.get('https://api.kincamp.com//prospect/?page='+page+'&per_page='+per_page+'&order=desc')

  }
  aceptarProspectos(id){
    return this.http.patch('https://api.kincamp.com//accept_prospect/'+id,{})

  }
  cancelarParticipacio(id){
    return this.http.delete('https://api.kincamp.com//staff_unsubscribe/'+id)

  }

  getPerfil(id ){
    return this.http.get('https://api.kincamp.com//staff/'+id)
  }
  

  reportProspecto( ){
    return this.http.post('https://api.kincamp.com//prospects/report/general',{})
  }
  
  createComment(info){
    return this.http.post('https://api.kincamp.com//staff_comment/',info)
  }
 
    searchCamps(name: string, location: any, school: any, page: number = 1, perPage: number = 10) {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (location) params.append('location', location);
      if (school) params.append('school', school);
      params.append('page', page.toString());
      params.append('per_page', perPage.toString());
      params.append('order', 'desc');
  
      return this.http.get(`https://api.kincamp.com//search/active_camp/?${params.toString()}`);
    }
    getCamp( page=1,per_page=10){
      return this.http.get('https://api.kincamp.com//active_camp/'+'?page='+page+'&per_page='+per_page+'&order=desc');
    }
}
