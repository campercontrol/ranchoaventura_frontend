import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private baseUrl = 'https://tu-backend.com/api';  // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para crear una preferencia en el backend
  createPreference(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_preference`, data);
  }
}
