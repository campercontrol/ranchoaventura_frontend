import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
 import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.kincamp.com/currency';

  constructor(private http: HttpClient) {}

  // Obtiene todas las monedas
  getCurrencies(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }

  // Busca una moneda por id
  getCurrencyById(id: number): Observable<any | undefined> {
    return this.getCurrencies().pipe(
      map((currencies: any[]) => currencies.find(c => c.id === id))
    );
  }
}
