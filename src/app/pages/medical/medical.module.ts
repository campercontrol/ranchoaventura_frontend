import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaConsultaComponent } from './nueva-consulta/nueva-consulta.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  
  ]
})
export class MedicalModule { }
