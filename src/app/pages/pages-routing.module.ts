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

const routes: Routes = [
  
  { path: '', component: RegisteredChildrenComponent },
  { path: 'parents/my-profile', component: PerfilComponent },
  { path: 'parents/registered-children', component: RegisteredChildrenComponent },
  { path: 'parents/new-camper', component: CamperNuevoComponent },
  { path: 'parents/camp-info/:camper/:camp', component: CampamentoComponent },
  { path: 'parents/inscription/camp-info/:camper/:camp', component: CampamentoComponent },
  { path: 'parents/inscription/camper/:id', component: PerfilCamperComponent },


  { path: 'camps/camp_add', component: NuevoCampamentoComponent },



  { path: 'parents/update-camper/:id', component: UpdateCamperComponent },
  { path: 'parents/camper/:id', component: PerfilCamperComponent },
  { path: 'parents/inscription/:id', component: ParentsInscripcionCampComponent },
  { path: 'staff/camps', component: CampamentosComponent },// vista de lista de camps
  { path: 'camp/:id', component: CampamentosStaffComponent }, // vista del campamento
  { path: 'staff/grouping', component: GroupingComponent}, 
  { path: 'consultation/camp',component:NuevaConsultaComponent},
//  { path: 'parents/new-user',component:NewParentComponent},
  { path: 'admi/temp', component: TemporadaComponent },
  { path: 'admi/camper', component: AdmiuserComponent },// admi a acamapdores
  { path: 'admi/parent', component: AdmiParentComponent },// admi a acamapdores
  { path: 'admi/user', component: AdmiUserComponent },// admi a acamapdores
  { path: 'admi/camps', component: AdmiCamperComponent },// admi a camps






  {path: 'staff/trophies',component:TrofeosComponent},
  {path: 'staff/perfil/:id',component:PerfilStaffComponent},
  {path: 'staff/perfil',component:PerfilStaffComponent},
  // pagos
  {path: 'payments/:idCamp/:idCamper', component: PagosComponent},
  {path: 'payments', component: PagosComponent},

  //

  {path: 'grouping/camp', component: AgregarAgrupacionComponent},
  {path: 'medical/care', component: MedicoComponent},
  {path: 'medical/camp-medical', component: TablaMedicalComponent},

  {path: 'mailing', component: GmailingComponent},
  {path: 'school/profile', component: PerfilEscuelaComponent },
  {path: 'mailing', component: GmailingComponent},
  {path: 'shop', component: TienditaComponent},

  {path: 'staff/update',component:UpdateStaffComponent},



  {path: 'staff/trainings',component:CapacitacionesComponent},
  {path: 'staff/trainings-events',component:TrainingEventComponent},
  {path: 'staff/training',component:CapacitacionesEventoComponent},
  {path: 'staff/trainings-dashboard',component:CreateTrainingComponent},
  {path: 'staff/trainings-card', component: ListaCapacitacionesComponent},

  {path: 'staff/applicants',component:ListaProspectosComponent},
  {path: 'staff',component:DashbordStaffComponent},
  {path: 'staff/checkpoint',component:ListaPuntosControlComponent},
  
//Catalogos
{path: 'catalogs/food-restriction',component:AlimentacionComponent},
{path: 'catalogs/currency',component:CurrencyComponent},
{path: 'catalogs/pathological_background',component:PathologicalBackgroundComponent},
{path: 'catalogs/pathological_background_Family',component:PathologicalBackgroundFamilyComponent},
{path: 'catalogs/paymentaccounts',component:PaymentaccountsComponent},
{path: 'catalogs/licensedmedicine',component:LicensedmedicineComponent},
{path: 'catalogs/vaccines',component:VaccinesComponent},
{path: 'catalogs/staffroles',component:StaffrolesComponent},
{path: 'catalogs/payment/method',component:MetodosPagosComponent},
{path: 'catalogs/camp_extra_question',component:PreguntasExtrasComponent},
{path: 'catalogs/camp_extra_change',component:CargosExtrasComponent},
{path: 'catalogs/school',component:EscuelaComponent},



//campers
{path: 'catalogs/campercomment',component:CampercommentComponent},










  {path: 'staff/checkpoint/:id',component:PuntoControlComponent},
  {path: 'staff/camps',component: MisCampamentosComponent},
  //{path:'staff/register', component:ProspectoComponent},
  





  {path: 'school/new', component: CampamentosNuevosComponent},
  {path: 'school/laste', component: CampamentosAnterioresComponent},
  {path: 'school/camp', component: TablaCampersEscuelasComponent},
  {path: 'school/perfil', component: PerfilEscuelaComponent},

  

  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'filemanager', component: FilemanagerComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
