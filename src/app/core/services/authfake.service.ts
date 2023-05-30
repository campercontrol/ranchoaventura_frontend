import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,  private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
      
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {

        return new Promise((resolve,reject)=>{
            return this.http.post<any>("http://142.93.12.234:8000/token?username=" +email+ "&password="+password +"&lang=1",{ })
            .subscribe((user:any) => {
                console.log(user);
                
                // login successful if there's a jwt token in the response
                        
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.router.navigate(['/parents/registered-children']);

                
                return resolve;
            }),error =>{
                return error;
            };
        })

      
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
