import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  constructor(private http:HttpClient)  { }

  getMedicalCamps(id:any){
    return this.http.get('http://142.93.12.234:8000/medical/camp/'+ id);
    
  }
  getMedicalCampCamper(campId,camperId){
    return this.http.get('http://142.93.12.234:8000/medical/camp/'+campId+'/camper/'+camperId);
    
  }
  nuevaConsulta(data){
    return this.http.post("http://142.93.12.234:8000/medical/camper/visit/",data);

  }
}
