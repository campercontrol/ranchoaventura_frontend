import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  constructor(private http:HttpClient)  { }
  private apiUrl = environment.apiUrl;

  getMedicalCamps(id:any){
    return this.http.get(this.apiUrl+'/medical/camp/'+ id);
    
  }
  getMedicalCampCamper(campId,camperId){
    return this.http.get(this.apiUrl+'/medical/camp/'+campId+'/camper/'+camperId);
    
  }
  nuevaConsulta(data){
    return this.http.post(this.apiUrl+"/medical/camper/visit/",data);

  }
  editConsulta(id,data){
    return this.http.patch(this.apiUrl+"/medical/camper/visit/"+id,data);
  }
}
