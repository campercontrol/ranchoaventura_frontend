import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  constructor(private http:HttpClient)  { }

  getMedicalCamps(id:any){
    return this.http.get('app.campercontrol.com:5050/medical/camp/'+ id);
    
  }
  getMedicalCampCamper(campId,camperId){
    return this.http.get('app.campercontrol.com:5050/medical/camp/'+campId+'/camper/'+camperId);
    
  }
  nuevaConsulta(data){
    return this.http.post("app.campercontrol.com:5050/medical/camper/visit/",data);

  }
}
