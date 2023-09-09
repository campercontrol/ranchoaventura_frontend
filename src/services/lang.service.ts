import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang$= new Subject<string>();
  lang= "esp";

  constructor(private http:HttpClient) {

   }

  getLang(){
    return this.lang$.asObservable();
  }

  setLang(lang){
    this.lang = lang
     this.lang$.next(lang)
}
}
