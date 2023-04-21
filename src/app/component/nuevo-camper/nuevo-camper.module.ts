import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamperNuevoComponent } from './camper-nuevo/camper-nuevo.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { Ng5SliderModule } from 'ng5-slider';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from 'src/app/pages/form/form.module';
import { UpdateCamperComponent } from './update-camper/update-camper.component';






@NgModule({
  declarations: [
    CamperNuevoComponent,
    UpdateCamperComponent
  ],exports:[
    NgSelectModule
  ],
  imports: [
    CommonModule,
    DropzoneModule,
    NgSelectModule,
    Ng5SliderModule,
    FormsModule,
    FormModule,
    NgbPaginationModule, 
    NgbAlertModule,
    ReactiveFormsModule,
    
    
    
  ]
})
export class NuevoCamperModule { }
