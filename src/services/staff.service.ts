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
    
    return this.http.post('http://142.93.12.234:8000/prospect/',prospecto)
  }
  getProspectosSearch(filters: any) {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });
  
    return this.http.get<any>('http://142.93.12.234:8000/search_prospect/', { params });
  }
  
  editStaff(a,id){
    return this.http.patch('http://142.93.12.234:8000/staff/complete/'+id,a)
  }
  infoPerfil(id,idioma = 'es'){
    return this.http.get('http://142.93.12.234:8000/staff/complete/'+id+'/'+idioma)
  }

  getPerfilStaff(id,idioma = 'es'){
    return this.http.get('http://142.93.12.234:8000/staff/profile/'+id+'/'+idioma)
  }

  getProspectos(page=1,per_page =10){
    return this.http.get('http://142.93.12.234:8000/prospect/?page='+page+'&per_page='+per_page+'&order=desc')

  }
  aceptarProspectos(id){
    return this.http.patch('http://142.93.12.234:8000/accept_prospect/'+id,{})

  }
  cancelarParticipacio(id){
    return this.http.delete('http://142.93.12.234:8000/staff_unsubscribe/'+id)

  }

  getPerfil(id = 18){
    return this.http.get('http://142.93.12.234:8000/staff/'+id)
  }
  
  createComment(info){
    return this.http.post('http://142.93.12.234:8000/staff_comment/',info)
  }

}
