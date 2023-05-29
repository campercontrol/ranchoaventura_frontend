import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { DropzoneModule } from 'ngx-dropzone-wrapper';


import { SharedModule } from './cyptolanding/shared/shared.module';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TableModule } from 'primeng/table';


import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { PerfilComponent } from './component/perfil/perfil.component';
import { RegisteredChildrenComponent } from './component/registered-children/registered-children.component';
import { NuevoCamperModule } from './component/nuevo-camper/nuevo-camper.module';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { CampamentoComponent } from './component/campamento/campamento.component';
import { PerfilCamperComponent } from './component/perfil-camper/perfil-camper.component';
import { StaffModule } from './staff/staff.module';
import { EscuelaModule } from './escuela/escuela.module';
import {TimelineModule} from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import {FieldsetModule} from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {DialogModule} from 'primeng/dialog';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewParentComponent } from './component/new-parent/new-parent.component';
import { ProspectoComponent } from './component/prospecto/prospecto.component';
import { DashbordStaffComponent } from './component/dashbord-staff/dashbord-staff.component';
import { ListaPuntosControlComponent } from './component/lista-puntos-control/lista-puntos-control.component';






if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
    PerfilComponent,
    RegisteredChildrenComponent,
    CampamentoComponent,
    PerfilCamperComponent,
    NewParentComponent,
    ProspectoComponent,
    DashbordStaffComponent,
    ListaPuntosControlComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AvatarModule,
    DialogModule,
    AvatarGroupModule,
    NgbPaginationModule, NgbAlertModule,
    DropzoneModule,
    TimelineModule, 
    ButtonModule,
    CardModule, 
    ReactiveFormsModule,
    BadgeModule,
    PanelModule,
      TableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    NuevoCamperModule,
    StaffModule,
    ExtrapagesModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    SharedModule,
    ScrollToModule.forRoot(),
    NgbModule,
    FieldsetModule,
    EscuelaModule,
   FormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class AppModule { }
