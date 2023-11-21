import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http:HttpClient) { 
      
  }
  prospectos(prospecto:any){
    console.log(prospecto);
    
    return this.http.post('http://64.227.16.165:8000/prospect/',prospecto)
  }
  editStaff(a,id){
    return this.http.patch('http://64.227.16.165:8000/staff/complete/'+id,a)
  }
  infoPerfil(id,idioma = 'es'){
    return this.http.get('http://64.227.16.165:8000/staff/complete/'+id+'/'+idioma)
  }

  getPerfilStaff(id,idioma = 'es'){
    return this.http.get('http://64.227.16.165:8000/staff/profile/'+id+'/'+idioma)
  }

  getProspectos(){
    return this.http.get('http://64.227.16.165:8000/prospect/')

  }
  aceptarProspectos(id){
    return this.http.patch('http://64.227.16.165:8000/accept_prospect/'+id,{})

  }
  cancelarParticipacio(id){
    return this.http.delete('http://64.227.16.165:8000/staff_unsubscribe/'+id)

  }

  getPerfil(id = 18){
    return this.http.get('http://64.227.16.165:8000/staff/'+id)
  }
  
  createComment(info){
    return this.http.post('http://64.227.16.165:8000/staff_comment/',info)
  }

}
