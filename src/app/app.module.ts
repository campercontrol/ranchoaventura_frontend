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
import {AvatarGroupModule} from 'primeng/avatargroup';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewParentComponent } from './component/new-parent/new-parent.component';
import { ProspectoComponent } from './component/prospecto/prospecto.component';
import { DashbordStaffComponent } from './component/dashbord-staff/dashbord-staff.component';
import { ListaPuntosControlComponent } from './component/lista-puntos-control/lista-puntos-control.component';
import { CreateTrainingComponent } from './component/create-training/create-training.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TemporadaComponent } from './component/temporada/temporada.component';
import { AlimentacionComponent } from './component/catalogos/alimentacion/alimentacion.component';
import { CurrencyComponent } from './component/catalogos/currency/currency.component';
import { PathologicalBackgroundComponent } from './component/catalogos/pathological-background/pathological-background.component';
import { PathologicalBackgroundFamilyComponent } from './component/catalogos/pathological-background-family/pathological-background-family.component';
import { PaymentaccountsComponent } from './component/catalogos/paymentaccounts/paymentaccounts.component';
import { LicensedmedicineComponent } from './component/catalogos/licensedmedicine/licensedmedicine.component';
import { VaccinesComponent } from './component/catalogos/vaccines/vaccines.component';
import { StaffrolesComponent } from './component/catalogos/staffroles/staffroles.component';
import { CampercommentComponent } from './component/admi/campercomment/campercomment.component';
import { PerfilStaffComponent } from './component/perfil-staff/perfil-staff.component';
import { TrainingEventComponent } from './component/training-event/training-event.component';
import { LoginComponent } from './login/login.component';
import { UpdateStaffComponent } from './component/update-staff/update-staff.component';
import { MetodosPagosComponent } from './component/catalogos/metodos-pagos/metodos-pagos.component';
import { PreguntasExtrasComponent } from './component/catalogos/preguntas-extras/preguntas-extras.component';
import { CargosExtrasComponent } from './component/catalogos/cargos-extras/cargos-extras.component';
import { EscuelaComponent } from './component/catalogos/escuela/escuela.component';
import { RedirigirComponent } from './redirigir/redirigir.component';
import { AdmiParentComponent } from './component/admi-parent/admi-parent.component';
import { AdmiuserComponent } from './component/admiuser/admiuser.component';
import { AdmiUserComponent } from './component/admi-user/admi-user.component';
import { AdmiCamperComponent } from './component/admi-camper/admi-camper.component';
import { AdmiPagosComponent } from './component/admi-pagos/admi-pagos.component';
import { ResetPaswordComponent } from './component/reset-pasword/reset-pasword.component';
import { ResetEmailComponent } from './component/reset-email/reset-email.component';
import { UpdatePerfilComponent } from './component/campamento/update-perfil/update-perfil.component';
import { SearchParentComponent } from './component/search-parent/search-parent.component';
import { EventosCapacitacionesComponent } from './component/eventos-capacitaciones/eventos-capacitaciones.component';
import { ListEventsComponent } from './component/list-events/list-events.component';
import { TrofeosComponent } from './component/trofeos/trofeos.component';
import { AdminStaffComponent } from './component/admin-staff/admin-staff.component';
import { AdminEditStaffComponent } from './component/admin-staff/admin-edit-staff/admin-edit-staff.component';
import { AdminStaffCreateComponent } from './component/admin-staff/admin-staff-create/admin-staff-create.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerificacionCuentaComponent } from './component/verificacion-cuenta/verificacion-cuenta.component';
import { LocacionComponent } from './component/locacion/locacion.component';
import { CampamentosProximosEscuelasComponent } from './component/campamentos-proximos-escuelas/campamentos-proximos-escuelas.component';
import { CampamentosAnterioresEscuelasComponent } from './component/campamentos-anteriores-escuelas/campamentos-anteriores-escuelas.component';
import { CamparsSchoolComponent } from './component/campars-school/campars-school.component';
import { PaymantCampComponent } from './component/paymant-camp/paymant-camp.component';









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
    CreateTrainingComponent,
    TemporadaComponent,
    AlimentacionComponent,
    CurrencyComponent,
    PathologicalBackgroundComponent,
    PathologicalBackgroundFamilyComponent,
    PaymentaccountsComponent,
    LicensedmedicineComponent,
    VaccinesComponent,
    StaffrolesComponent,
    CampercommentComponent,
    PerfilStaffComponent,
    TrainingEventComponent,
    LoginComponent,
    UpdateStaffComponent,
    MetodosPagosComponent,
    PreguntasExtrasComponent,
    CargosExtrasComponent,
    EscuelaComponent,
    RedirigirComponent,
    AdmiParentComponent,
    AdmiuserComponent,
    AdmiUserComponent,
    AdmiCamperComponent,
    AdmiPagosComponent,
    ResetPaswordComponent,
    ResetEmailComponent,
    UpdatePerfilComponent,
    SearchParentComponent,
    EventosCapacitacionesComponent,
    ListEventsComponent,
    TrofeosComponent,
    AdminStaffComponent,
    AdminEditStaffComponent,
    AdminStaffCreateComponent,
    ResetPasswordComponent,
    VerificacionCuentaComponent,
    LocacionComponent,
    CampamentosProximosEscuelasComponent,
    CampamentosAnterioresEscuelasComponent,
    CamparsSchoolComponent,
    PaymantCampComponent
       
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AvatarModule,
    DialogModule,
    CKEditorModule,
    TooltipModule,
    AvatarGroupModule,
    EditorModule,
    NgbPaginationModule, NgbAlertModule,
    DropzoneModule,
    TimelineModule, 
    ButtonModule,
    CardModule, 
    ReactiveFormsModule,
    BadgeModule,
    PanelModule,
    OrderListModule,
    NgbToastModule,
    TabViewModule,
    TagModule,

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
  ],schemas: [
    CUSTOM_ELEMENTS_SCHEMA
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
