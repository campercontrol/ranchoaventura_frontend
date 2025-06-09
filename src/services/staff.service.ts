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
    
    return this.http.post('https://api-dev.campercontrol.com/prospect/',prospecto)
  }
  getProspectosSearch(filters: any) {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });
  
    return this.http.get<any>('https://api-dev.campercontrol.com/search_prospect/', { params });
  }
  
  editStaff(a,id){
    return this.http.patch('https://api-dev.campercontrol.com/staff/complete/'+id,a)
  }
  infoPerfil(id,idioma = 'es'){
    return this.http.get('https://api-dev.campercontrol.com/staff/complete/'+id+'/'+idioma)
  }

  getPerfilStaff(id,idioma = 'es'){
    return this.http.get('https://api-dev.campercontrol.com/staff/profile/'+id+'/'+idioma)
  }

  getProspectos(page=1,per_page =10){
    return this.http.get('https://api-dev.campercontrol.com/prospect/?page='+page+'&per_page='+per_page+'&order=desc')

  }
  aceptarProspectos(id){
    return this.http.patch('https://api-dev.campercontrol.com/accept_prospect/'+id,{})

  }
  cancelarParticipacio(id){
    return this.http.delete('https://api-dev.campercontrol.com/staff_unsubscribe/'+id)

  }

  getPerfil(id = 18){
    return this.http.get('https://api-dev.campercontrol.com/staff/'+id)
  }
  
  createComment(info){
    return this.http.post('https://api-dev.campercontrol.com/staff_comment/',info)
  }

}
