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

 

  // Función para descargar imágenes y guardarlas en un ZIP
  downloadImagesAsZip(imageUrls: string[]) {
    const zip = new JSZip();
    const folder = zip.folder("images");  // Crea una carpeta dentro del zip llamada 'images'

    // Crear una lista de promesas que descargan las imágenes
    const imagePromises = imageUrls.map((url, index) => 
      fetch(url)  // Obtener la imagen desde la URL
        .then(response => response.blob())  // Convertir la respuesta a Blob
        .then(blob => {
          const fileName = `image${index + 1}.jpg`; // Puedes ajustar el nombre y la extensión según el tipo de imagen
          folder?.file(fileName, blob);  // Añadir la imagen al ZIP
        })
        .catch(error => console.error('Error al descargar la imagen:', error))
    );

    // Esperar a que todas las imágenes se descarguen
    Promise.all(imagePromises)
      .then(() => {
        // Generar el archivo ZIP
        zip.generateAsync({ type: 'blob' })
          .then((content) => {
            // Guardar el archivo ZIP en el navegador
            saveAs(content, 'images.zip');
          })
          .catch(error => console.error('Error al generar el archivo ZIP:', error));
      });
  }



  // reportes


  getReportesGenerales(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/general_report`); 
  }
  getReportesGeneralesStaff(id:any){
    return this.http.get(`http://142.93.12.234:8000/camps/${id}/general_staff_report`); 
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
