import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private baseUrl = 'https://api.kincamp.com//';  // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para crear una preferencia en el backend
  tablereference(camper_id,camp_id){
    return this.http.post(`${this.baseUrl}camps/${camper_id}/campers/${camp_id}/mercadopago/payments`,{}); 
  }
  createPreference(camp_id,camper_id,pago): Observable<any> {
    return this.http.get(`${this.baseUrl}mercado_pago/create_payment_link/${camp_id}/${camper_id}/${pago}`);
  }
}
