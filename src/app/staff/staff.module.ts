import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { UIModule } from '../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { TablesRoutingModule } from '../pages/tables/tables-routing.module';
import { CampamentosComponent } from './campamentos/campamentos.component';
import { AdvancedSortableDirective } from '../pages/tables/advancedtable/advanced-sortable.directive';
import { BasicComponent } from '../pages/email/basic/basic.component';
import { AdvancedtableComponent } from '../pages/tables/advancedtable/advancedtable.component';
import { NuevoCampamentoComponent } from './nuevo-campamento/nuevo-campamento.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CampamentosStaffComponent } from './campamentos-staff/campamentos-staff.component';
import { GroupingComponent } from './grouping/grouping.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MedicoComponent } from './medico/medico.component';
import { AgregarAgrupacionComponent } from './agregar-agrupacion/agregar-agrupacion.component';
import { CampamentosNuevosComponent } from './campamentos-nuevos/campamentos-nuevos.component';
import {TableModule} from 'primeng/table';
import {BadgeModule} from 'primeng/badge';
import { CampamentosAnterioresComponent } from './campamentos-anteriores/campamentos-anteriores.component';
import { TablaCampersEscuelasComponent } from './tabla-campers-escuelas/tabla-campers-escuelas.component';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { ParentsInscripcionCampComponent } from './parents-inscripcion-camp/parents-inscripcion-camp.component';
import {RatingModule} from 'primeng/rating';
import {CheckboxModule} from 'primeng/checkbox';
import { TrofeosComponent } from './trofeos/trofeos.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {FieldsetModule} from 'primeng/fieldset';
import {DialogModule} from 'primeng/dialog';
import { TablaMedicalComponent } from './tabla-medical/tabla-medical.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { TienditaComponent } from './tiendita/tiendita.component';
import {StepsModule} from 'primeng/steps';
import {TabViewModule} from 'primeng/tabview';
import { PagosComponent } from './pagos/pagos.component';
import {CalendarModule} from 'primeng/calendar';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { CapacitacionesEventoComponent } from './capacitaciones-evento/capacitaciones-evento.component';
import { ListaCapacitacionesComponent } from './lista-capacitaciones/lista-capacitaciones.component';
import { PuntoControlComponent } from './punto-control/punto-control.component';
import { MisCampamentosComponent } from './mis-campamentos/mis-campamentos.component';
import { ListaStaffComponent } from './lista-staff/lista-staff.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ListaProspectosComponent } from './lista-prospectos/lista-prospectos.component';
import { CardCapacitacionesComponent } from './card-capacitaciones/card-capacitaciones.component';
import { FormModule } from '../pages/form/form.module';
import { UpdatePerfilComponent } from './parents-inscripcion-camp/update-perfil/update-perfil.component';











@NgModule({
  declarations: [
    CampamentosComponent,
    NuevoCampamentoComponent,
    CampamentosStaffComponent,
    GroupingComponent,
    MedicoComponent,
    AgregarAgrupacionComponent,
    CampamentosNuevosComponent,
    CampamentosAnterioresComponent,
    TablaCampersEscuelasComponent,
    ParentsInscripcionCampComponent,
    TrofeosComponent,
    TablaMedicalComponent,
    TienditaComponent,
    PagosComponent,
    CapacitacionesComponent,
    CapacitacionesEventoComponent,
    ListaCapacitacionesComponent,
    PuntoControlComponent,
    MisCampamentosComponent,
    ListaStaffComponent,
    ListaProspectosComponent,
    CardCapacitacionesComponent,
    UpdatePerfilComponent,
    
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    UIModule,
    TooltipModule,
    ButtonModule,
    DialogModule,
    OverlayPanelModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FieldsetModule,
    TableModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    CheckboxModule,
    Ng2SmartTableModule,
    NgSelectModule,
    CKEditorModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    BadgeModule,
    AvatarModule,
    RatingModule,
    AvatarGroupModule,
    SplitButtonModule,
    StepsModule,
    TabViewModule,
    CalendarModule,
    ConfirmDialogModule,
    FormsModule,
    FormModule
  ]
})
export class StaffModule { }
