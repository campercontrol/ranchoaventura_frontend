import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampsVistaService {

  constructor(private http:HttpClient) {

  }

  getInfoCamp(id){
      return this.http.get('http://64.227.16.165:8000/staff/camp/'+id);
  }
  getRolSatff( ){
    return this.http.get('http://64.227.16.165:8000/staff_role/');
  }
  getListaSatff(){
    return this.http.get('http://64.227.16.165:8000/staff/');
  }

  aceptarStaff(id,info){
    return this.http.post('http://64.227.16.165:8000/accept/staff/camp/'+id,info)
  }
  asignarRolStaff(id,rolid,info){
    return this.http.post('http://64.227.16.165:8000/update/staff/role/'+id+'/'+rolid,info)
  }

  pulseras1x11(id:any ){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.get('http://64.227.16.165:8000/camp/bracelets/zt230/'+id,{headers,responseType: 'blob' as 'json'} );
  }
  pulseras8hoja(id:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.get('http://64.227.16.165:8000/camp/bracelets/'+id,{headers,responseType: 'blob' as 'json'} );
  }

  Pdfinfodecampers(id:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get('http://64.227.16.165:8000/camp/bracelets/'+id,{headers,responseType: 'blob' as 'json'} );
  }


}
