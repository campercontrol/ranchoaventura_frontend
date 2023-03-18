import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamperNuevoComponent } from './camper-nuevo/camper-nuevo.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { Ng5SliderModule } from 'ng5-slider';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [
    CamperNuevoComponent
  ],exports:[
    NgSelectModule
  ],
  imports: [
    CommonModule,
    DropzoneModule,
    NgSelectModule,
    Ng5SliderModule,
    NgbPaginationModule, NgbAlertModule
    
    
  ]
})
export class NuevoCamperModule { }
