import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilEscuelaComponent } from './perfil-escuela/perfil-escuela.component';


@NgModule({
  declarations: [
    PerfilEscuelaComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    PerfilEscuelaComponent
  ]
})
export class EscuelaModule { }
