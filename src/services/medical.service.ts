import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  constructor(private http:HttpClient)  { }

  getMedicalCamps(id:any){
    return this.http.get('https://api-dev.kincamp.com/medical/camp/'+ id);
    
  }
  getMedicalCampCamper(campId,camperId){
    return this.http.get('https://api-dev.kincamp.com/medical/camp/'+campId+'/camper/'+camperId);
    
  }
  nuevaConsulta(data){
    return this.http.post("https://api-dev.kincamp.com/medical/camper/visit/",data);

  }
}
