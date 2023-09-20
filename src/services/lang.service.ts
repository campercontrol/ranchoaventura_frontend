import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang$=  new BehaviorSubject<string>("esp")
  lang= "esp";

  constructor(private http:HttpClient) {
    this.lang$.next(this.lang);
   }

  getLang(){
    return this.lang$.asObservable();
  }

  setLang(lang){
    this.lang = lang
     this.lang$.next(lang)
}
}
