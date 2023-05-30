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
    
    return this.http.post('http://142.93.12.234:8000/prospect/',prospecto)
  }

  getProspectos(){
    return this.http.get('http://142.93.12.234:8000/prospect/')

  }
  aceptarProspectos(id){
    return this.http.patch('http://142.93.12.234:8000/accept_prospect/'+id,{})

  }
  cancelarParticipacio(id){
    return this.http.delete('http://142.93.12.234:8000/staff_unsubscribe/'+id)

  }
  

}
