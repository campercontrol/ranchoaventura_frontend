import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { 

  }

  getAlimentos(){
    return this.http.get('http://142.93.12.234:8000/food_restriction/');
  }

  postAlimentos(a:any){
    return this.http.post('http://142.93.12.234:8000/food_restriction/',a);
  }
  updateAlimentos(a:any,id){
    return this.http.post('http://142.93.12.234:8000/food_restriction/'+id,a);
  }
  delerAlimentos(id){
    return this.http.delete('http://142.93.12.234:8000/delete_food_restriction/'+id);
  }



  getcurrency(){
    return this.http.get('http://142.93.12.234:8000/currency/');
  }

  postcurrency(a:any){
    return this.http.post('http://142.93.12.234:8000/currency/',a);
  }
  updatcurrency(a:any,id){
    return this.http.post('http://142.93.12.234:8000/currency/'+id,a);
  }
  delecurrency(id){
    return this.http.delete('http://142.93.12.234:8000/delete_currency/'+id);
  }
}
