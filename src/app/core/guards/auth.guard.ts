import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authenticationService.logaot();
        if(this.authenticationService.loggedIn){
                    // Obtener el tipo de usuario desde la autenticación
        const userType = this.authenticationService.infToken.role_id;
        const user_admin = this.authenticationService.infToken.user_admin;
        const user_coordinator = this.authenticationService.infToken.user_coordinator;
       // Verificar el tipo de usuario y permitir el acceso según las reglas definidas
        switch (userType) {
            case 1: //parent
                // Permitir acceso a las rutas que comienzan con 'parents'
                if (state.url.includes('/parents')) {
                    return true;
                }
                break;
            case 2: //staff
                if(user_admin){
                    return true;
                }
                if(user_coordinator){
                    //Permitir acceso a todo menos administrador, catalogos
                    if (state.url.includes('/catalogs') || state.url.includes('/admi') || state.url.includes('/mailing')) {
 

                        return false;
                    }
                    return true;
                }

                if( !user_coordinator){
                    // Solo puede entrar a listado de campamentos, medical y staff
                    if (state.url.includes('/camp') || state.url.includes('/medical') || state.url.includes('/staff')) {
                        return true;
                    }
                    // Permitir acceso a las rutas que comienzan con 'camp' o 'camp' o 'medical' lo que es lo mismo que staff
                    // no puede entrar a mailing, catalogos, administrador
                    return false;
                }

                break;
            case 3:
                if (state.url.includes('/camp') || state.url.includes('/medical') || state.url.includes('/staff')|| state.url.includes('/school')) {
                    return true;
                }
                return false;
                break;
            case 4: //coordinator
            if (state.url.includes('/camp') || state.url.includes('/medical') || state.url.includes('/staff')|| state.url.includes('/mailing')|| state.url.includes('/school')) {
                return true;
            }
            // Permitir acceso a las rutas que comienzan con 'camp' o 'camp' o 'medical' lo que es lo mismo que staff
            // no puede entrar a mailing, catalogos, administrador
            return false;
                break;
            case 5: //medical
                // Permitir acceso a las rutas que comienzan con 'medical'
                if (state.url.includes('/medical') || state.url.includes('camps')) { //listado de campamentos y medical
                    return true;
                }
                return false;
                break;
            default:
                return false;

                break;
        }
       }else{
        return false;
      
       }
    }
}
