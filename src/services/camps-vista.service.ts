import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampsVistaService {

  constructor(private http:HttpClient) {

  }

  getInfoCamp(id){
      return this.http.get('http://142.93.12.234:8000/staff/camp/'+id);
  }
  getRolSatff( ){
    return this.http.get('http://142.93.12.234:8000/staff_role/');
  }
  getListaSatff(){
    return this.http.get('http://142.93.12.234:8000/staff/');
  }

  aceptarStaff(id,info){
    return this.http.post('http://142.93.12.234:8000/accept/staff/camp/'+id,info)
  }
  asignarRolStaff(id,rolid,info){
    return this.http.post('http://142.93.12.234:8000/update/staff/role/'+id+'/'+rolid,info)
  }

  pulseras1x11(id:any ){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.get('http://142.93.12.234:8000/camp/bracelets/zt230/'+id,{headers,responseType: 'blob' as 'json'} );
  }
  pulseras8hoja(id:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.get('http://142.93.12.234:8000/camp/bracelets/'+id,{headers,responseType: 'blob' as 'json'} );
  }

  Pdfinfodecampers(id:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get('http://142.93.12.234:8000/camp/bracelets/'+id,{headers,responseType: 'blob' as 'json'} );
  }



  // reportes


  getReportesGenerales(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/general_report`); 
  }
  getReportesSeguros(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/insurance_report`); 
  }
  getReportesContactossMedical(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/medical_report`); 
  }
  getReporteComidaRestringida(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/food_report`); 
  }

  getReporteSocialExtras(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/contact_report`); 
  }
  getReporteExtras(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/extras_report`); 
  }
}
