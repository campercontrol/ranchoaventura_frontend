import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampamentoComponent } from '../component/campamento/campamento.component';
import { CamperNuevoComponent } from '../component/nuevo-camper/camper-nuevo/camper-nuevo.component';
import { PerfilCamperComponent } from '../component/perfil-camper/perfil-camper.component';
import { PerfilComponent } from '../component/perfil/perfil.component';
import { RegisteredChildrenComponent } from '../component/registered-children/registered-children.component';
import { CampamentosStaffComponent } from '../staff/campamentos-staff/campamentos-staff.component';
import { CampamentosComponent } from '../staff/campamentos/campamentos.component';
import { NuevoCampamentoComponent } from '../staff/nuevo-campamento/nuevo-campamento.component';
import { GroupingComponent } from '../staff/grouping/grouping.component';
import { MedicoComponent } from '../staff/medico/medico.component';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { NuevaConsultaComponent } from './medical/nueva-consulta/nueva-consulta.component';
import { GmailingComponent } from './gmailing/gmailing.component';
import { AgregarAgrupacionComponent } from '../staff/agregar-agrupacion/agregar-agrupacion.component';
import { PerfilEscuelaComponent } from '../escuela/perfil-escuela/perfil-escuela.component';
import { CampamentosNuevosComponent } from '../staff/campamentos-nuevos/campamentos-nuevos.component';
import { CampamentosAnterioresComponent } from '../staff/campamentos-anteriores/campamentos-anteriores.component';
import { TablaCampersEscuelasComponent } from '../staff/tabla-campers-escuelas/tabla-campers-escuelas.component';
import { ParentsInscripcionCampComponent } from '../staff/parents-inscripcion-camp/parents-inscripcion-camp.component';
import { TrofeosComponent } from '../staff/trofeos/trofeos.component';
import { TablaMedicalComponent } from '../staff/tabla-medical/tabla-medical.component';
import { TienditaComponent } from '../staff/tiendita/tiendita.component';
import { PagosComponent } from '../staff/pagos/pagos.component';
import { CapacitacionesComponent } from '../staff/capacitaciones/capacitaciones.component';
import { CapacitacionesEventoComponent } from '../staff/capacitaciones-evento/capacitaciones-evento.component';
import { ListaCapacitacionesComponent } from '../staff/lista-capacitaciones/lista-capacitaciones.component';
import { PuntoControlComponent } from '../staff/punto-control/punto-control.component';
import { MisCampamentosComponent } from '../staff/mis-campamentos/mis-campamentos.component';
import { ListaStaffComponent } from '../staff/lista-staff/lista-staff.component';
import { NewParentComponent } from '../component/new-parent/new-parent.component';
import { UpdateCamperComponent } from '../component/nuevo-camper/update-camper/update-camper.component';
import { ProspectoComponent } from '../component/prospecto/prospecto.component';
import { ListaProspectosComponent } from '../staff/lista-prospectos/lista-prospectos.component';
import { DashbordStaffComponent } from '../component/dashbord-staff/dashbord-staff.component';
import { ListaPuntosControlComponent } from '../component/lista-puntos-control/lista-puntos-control.component';
import { CreateTrainingComponent } from '../component/create-training/create-training.component';
import { TemporadaComponent } from '../component/temporada/temporada.component';
import { AlimentacionComponent } from '../component/catalogos/alimentacion/alimentacion.component';
import { CurrencyComponent } from '../component/catalogos/currency/currency.component';
import { PathologicalBackgroundComponent } from '../component/catalogos/pathological-background/pathological-background.component';
import { PathologicalBackgroundFamilyComponent } from '../component/catalogos/pathological-background-family/pathological-background-family.component';
import { PaymentaccountsComponent } from '../component/catalogos/paymentaccounts/paymentaccounts.component';
import { LicensedmedicineComponent } from '../component/catalogos/licensedmedicine/licensedmedicine.component';
import { VaccinesComponent } from '../component/catalogos/vaccines/vaccines.component';
import { StaffrolesComponent } from '../component/catalogos/staffroles/staffroles.component';
import { CampercommentComponent } from '../component/admi/campercomment/campercomment.component';
import { PerfilStaffComponent } from '../component/perfil-staff/perfil-staff.component';
import { TrainingEventComponent } from '../component/training-event/training-event.component';
import { UpdateStaffComponent } from '../component/update-staff/update-staff.component';
import { MetodosPagosComponent } from '../component/catalogos/metodos-pagos/metodos-pagos.component';
import { PreguntasExtrasComponent } from '../component/catalogos/preguntas-extras/preguntas-extras.component';
import { CargosExtrasComponent } from '../component/catalogos/cargos-extras/cargos-extras.component';
import { EscuelaComponent } from '../component/catalogos/escuela/escuela.component';
import { AdmiuserComponent } from '../component/admiuser/admiuser.component';
import { AdmiParentComponent } from '../component/admi-parent/admi-parent.component';
import { AdmiUserComponent } from '../component/admi-user/admi-user.component';
import { AdmiCamperComponent } from '../component/admi-camper/admi-camper.component';
import { AdmiPagosComponent } from '../component/admi-pagos/admi-pagos.component';
import { SearchParentComponent } from '../component/search-parent/search-parent.component';
import { EventosCapacitacionesComponent } from '../component/eventos-capacitaciones/eventos-capacitaciones.component';
import { ListEventsComponent } from '../component/list-events/list-events.component';
import { AdminStaffComponent } from '../component/admin-staff/admin-staff.component';
import { AdminTipoAgrupacionesComponent } from '../staff/admin-tipo-agrupaciones/admin-tipo-agrupaciones.component';
import { GroupingAdmiComponent } from '../staff/grouping-admi/grouping-admi.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ListadoStaffComponent } from '../staff/listado-staff/listado-staff.component';
import { ListadoCampersComponent } from '../staff/listado-campers/listado-campers.component';

const routes: Routes = [
  
  { path: '', component: RegisteredChildrenComponent, canActivate: [AuthGuard] },
  { path: 'parents/my-profile', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'parents', component: RegisteredChildrenComponent, canActivate: [AuthGuard] },

  { path: 'parents/registered-children', component: RegisteredChildrenComponent, canActivate: [AuthGuard] },
  { path: 'parents/new-camper', component: CamperNuevoComponent, canActivate: [AuthGuard] },
  { path: 'parents/camp-info/:camper/:camp', component: CampamentoComponent, canActivate: [AuthGuard] },
  { path: 'parents/inscription/camp-info/:camper/:camp', component: CampamentoComponent, canActivate: [AuthGuard] },
  { path: 'parents/inscription/camper/:id', component: PerfilCamperComponent, canActivate: [AuthGuard] },


  { path: 'camps/camp_add', component: NuevoCampamentoComponent, canActivate: [AuthGuard] },
  { path: 'parents/update-camper/:id', component: UpdateCamperComponent, canActivate: [AuthGuard] },
  { path: 'parents/camper/:id', component: PerfilCamperComponent, canActivate: [AuthGuard] },
  { path: 'parents/inscription/:id', component: ParentsInscripcionCampComponent, canActivate: [AuthGuard] },
  { path: 'staff/camps', component: CampamentosComponent, canActivate: [AuthGuard] },// vista de lista de camps
  { path: 'staff/employees', component: ListadoStaffComponent   },// vista de lista de camps
  { path: 'staff/campers', component: ListadoCampersComponent  },// vista de lista de camps

  { path: 'camp/:id', component: CampamentosStaffComponent, canActivate: [AuthGuard] }, // vista del campamento
  { path: 'staff/grouping/:id', component: GroupingComponent}, 
//  { path: 'parents/new-user',component:NewParentComponent},
  { path: 'admi/temp', component: TemporadaComponent, canActivate: [AuthGuard] },
  { path: 'admi/camper', component: AdmiuserComponent, canActivate: [AuthGuard] },// admi a acamapdores
  { path: 'admi/parent', component: AdmiParentComponent, canActivate: [AuthGuard] },// admi a acamapdores
  { path: 'admi/user', component: AdmiUserComponent, canActivate: [AuthGuard] },// admi a acamapdores
  { path: 'admi/camps', component: AdmiCamperComponent, canActivate: [AuthGuard] },// admi a camps
 // { path: 'admi/paymants', component: AdmiPagosComponent, canActivate: [AuthGuard] },// admi a camps
  { path: 'admi/search', component: SearchParentComponent, canActivate: [AuthGuard] },// admi a camps
  { path: 'admi/events', component: EventosCapacitacionesComponent, canActivate: [AuthGuard] },// admi a camps
  { path: 'admi/staff', component: AdminStaffComponent, canActivate: [AuthGuard] },// admi a camps
  { path: 'admi/grouping/type', component: AdminTipoAgrupacionesComponent, canActivate: [AuthGuard] },// admi a camps
  { path: 'admi/grouping', component: GroupingAdmiComponent, canActivate: [AuthGuard] },// admi a camps




  { path: 'staff/events', component: ListEventsComponent, canActivate: [AuthGuard] },// admi a camps
  
  { path: 'trofeos', component: TrofeosComponent, canActivate: [AuthGuard] },// admi a camps










  {path: 'staff/trophies',component:TrofeosComponent, canActivate: [AuthGuard] },
  {path: 'staff/perfil/:id',component:PerfilStaffComponent, canActivate: [AuthGuard] },
  {path: 'staff/perfil',component:PerfilStaffComponent, canActivate: [AuthGuard] },
  // pagos
  {path: 'payments/:idCamp/:idCamper', component: PagosComponent, canActivate: [AuthGuard] },
  {path: 'payments', component: PagosComponent, canActivate: [AuthGuard] },

  //

  //{path: 'grouping/camp', component: AgregarAgrupacionComponent, canActivate: [AuthGuard] },
  {path: 'medical/care/:campId/:camperid', component: MedicoComponent, canActivate: [AuthGuard] },
  {path: 'medical/camp-medical/:id', component: TablaMedicalComponent, canActivate: [AuthGuard] },
  { path: 'medical/add_consultation/:campId/:camperid',component:NuevaConsultaComponent, canActivate: [AuthGuard] },


  {path: 'mailing', component: GmailingComponent },
  {path: 'school/profile', component: PerfilEscuelaComponent, canActivate: [AuthGuard] },
  {path: 'shop', component: TienditaComponent, canActivate: [AuthGuard] },

  {path: 'staff/update',component:UpdateStaffComponent, canActivate: [AuthGuard] },



  {path: 'staff/trainings',component:CapacitacionesComponent, canActivate: [AuthGuard] },
  {path: 'staff/trainings-events',component:TrainingEventComponent, canActivate: [AuthGuard] },
  {path: 'staff/training',component:CapacitacionesEventoComponent, canActivate: [AuthGuard] },
  {path: 'staff/trainings-dashboard',component:CreateTrainingComponent, canActivate: [AuthGuard] },
  {path: 'staff/trainings-card', component: ListaCapacitacionesComponent, canActivate: [AuthGuard] },

  {path: 'staff/applicants',component:ListaProspectosComponent, canActivate: [AuthGuard] },
  {path: 'staff',component:DashbordStaffComponent, canActivate: [AuthGuard] },
 // {path: 'staff/checkpoint',component:ListaPuntosControlComponent, canActivate: [AuthGuard] },
  
//Catalogos
{path: 'catalogs/food-restriction',component:AlimentacionComponent, canActivate: [AuthGuard] },
{path: 'catalogs/currency',component:CurrencyComponent, canActivate: [AuthGuard] },
{path: 'catalogs/pathological_background',component:PathologicalBackgroundComponent, canActivate: [AuthGuard] },
{path: 'catalogs/pathological_background_Family',component:PathologicalBackgroundFamilyComponent, canActivate: [AuthGuard] },
{path: 'catalogs/paymentaccounts',component:PaymentaccountsComponent, canActivate: [AuthGuard] },
{path: 'catalogs/licensedmedicine',component:LicensedmedicineComponent, canActivate: [AuthGuard] },
{path: 'catalogs/vaccines',component:VaccinesComponent, canActivate: [AuthGuard] },
{path: 'catalogs/staffroles',component:StaffrolesComponent, canActivate: [AuthGuard] },
{path: 'catalogs/payment/method',component:MetodosPagosComponent, canActivate: [AuthGuard] },
{path: 'catalogs/camp_extra_question',component:PreguntasExtrasComponent, canActivate: [AuthGuard] },
{path: 'catalogs/camp_extra_change',component:CargosExtrasComponent, canActivate: [AuthGuard] },
{path: 'catalogs/school',component:EscuelaComponent, canActivate: [AuthGuard] },



//campers
{path: 'catalogs/campercomment',component:CampercommentComponent, canActivate: [AuthGuard] },










  {path: 'staff/checkpoint/:id',component:PuntoControlComponent, canActivate: [AuthGuard] },
  {path: 'staff/camps',component: MisCampamentosComponent, canActivate: [AuthGuard] },
  //{path:'staff/register', component:ProspectoComponent, canActivate: [AuthGuard] },
  





  {path: 'school/new', component: CampamentosNuevosComponent, canActivate: [AuthGuard] },
  {path: 'school/laste', component: CampamentosAnterioresComponent, canActivate: [AuthGuard] },
  {path: 'school/camp', component: TablaCampersEscuelasComponent, canActivate: [AuthGuard] },
  {path: 'school/perfil', component: PerfilEscuelaComponent, canActivate: [AuthGuard] },

  

  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'filemanager', component: FilemanagerComponent, canActivate: [AuthGuard] },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule), canActivate: [AuthGuard] },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule), canActivate: [AuthGuard] },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule), canActivate: [AuthGuard] },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule), canActivate: [AuthGuard] },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule), canActivate: [AuthGuard] },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule), canActivate: [AuthGuard] },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule), canActivate: [AuthGuard] },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule), canActivate: [AuthGuard] },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule), canActivate: [AuthGuard] },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule), canActivate: [AuthGuard] },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule), canActivate: [AuthGuard] },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule), canActivate: [AuthGuard] },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule), canActivate: [AuthGuard] },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule), canActivate: [AuthGuard] },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule), canActivate: [AuthGuard] },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
