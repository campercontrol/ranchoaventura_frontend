import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http:HttpClient) { }

  getParet(id: number = 1): Observable<any>{
    return this.http.get('http://142.93.12.234:8000/parent/'+ id);
    
  }

  partnPatch(id: number = 1,info:{}):Observable<any> {
     return this.http.patch('http://142.93.12.234:8000/parent/'+ id,info)
  }
}
