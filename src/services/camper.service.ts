import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CamperService {

  constructor(private http : HttpClient) { }


  getCatalogos(idioma:string = 'es'){
    return this.http.get('http://142.93.12.234:8000/camper_form/'+idioma)
  }
}
