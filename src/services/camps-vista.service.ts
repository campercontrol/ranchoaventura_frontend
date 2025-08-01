import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CampsVistaService {

  constructor(private http:HttpClient) {

  }

  getInfoCamp(id){
      return this.http.get(' https://api.kincamp.com/staff/camp/'+id);
  }
  getRolSatff( ){
    return this.http.get(' https://api.kincamp.com/staff_role/');
  }
  getListaSatff(){
    return this.http.get(' https://api.kincamp.com/staff/');
  }

  aceptarStaff(id,info){
    return this.http.post(' https://api.kincamp.com/accept/staff/camp/'+id,info)
  }
  asignarRolStaff(id,rolid,info){
    return this.http.post(' https://api.kincamp.com/update/staff/role/'+id+'/'+rolid,info)
  }

  pulseras1x11(id:any ){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.get(' https://api.kincamp.com/camp/bracelets/zt230/'+id,{headers,responseType: 'blob' as 'json'} );
  }
  pulseras8hoja(id:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.get(' https://api.kincamp.com/camp/bracelets/'+id,{headers,responseType: 'blob' as 'json'} );
  }

  Pdfinfodecampers(id:any){
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(' https://api.kincamp.com/camp/bracelets/'+id,{headers,responseType: 'blob' as 'json'} );
  }

 

  // Función para descargar imágenes y guardarlas en un ZIP
  downloadImages(urls: string[]): void {
    urls.forEach(url => {
      this.http.get(url, { responseType: 'blob' }).subscribe(
        (response: Blob) => {
          // Crear un enlace para descargar la imagen
          const link = document.createElement('a');
          const objectUrl = URL.createObjectURL(response);
          link.href = objectUrl;
          link.download = url.split('/').pop() || 'downloaded_image'; // Extrae el nombre del archivo
          link.click();
          URL.revokeObjectURL(objectUrl); // Revocar el objeto URL para liberar memoria
        },
        (error) => {
          console.error('Error al descargar la imagen:', error);
        }
      );
    });
  }



  // reportes


  getReportesGenerales(id:any){
    return this.http.get(` https://api.kincamp.com/camps/${id}/general_report`); 
  }
  getReportesGeneralesStaff(id:any){
    return this.http.get(` https://api.kincamp.com/camps/${id}/general_staff_report`); 
  }
  getReportesSeguros(id:any){
    return this.http.get(` https://api.kincamp.com/camps/${id}/insurance_report`); 
  }
  getReportesContactossMedical(id:any){
    return this.http.get(` https://api.kincamp.com/camps/${id}/medical_report`); 
  }
  getReporteComidaRestringida(id:any){
    return this.http.get(` https://api.kincamp.com/camps/${id}/food_report`); 
  }

  getReporteSocialExtras(id:any){
    return this.http.get(` https://api.kincamp.com/camps/${id}/contact_report`); 
  }
  getReporteExtras(id:any){
    return this.http.get(` https://api.kincamp.com/camps/${id}/extras_report`); 
  }
}
