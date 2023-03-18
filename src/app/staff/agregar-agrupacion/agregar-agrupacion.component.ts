import { Component, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-agregar-agrupacion',
  templateUrl: './agregar-agrupacion.component.html',
  styleUrls: ['./agregar-agrupacion.component.scss']
})
export class AgregarAgrupacionComponent  {
  @ViewChild('myTable') table: any;

  rows: any[] = [
    {
      id: 0, 
      nombre: 'Alan',
      fecha: '08/09/12', 
      sexo: 'M', 
      grado: 'Kinder', 
      autobus: 'Autobús 1', 
      cabana: 'Cabaña1',
      equipo: 'equipo1'
    }, 
    {
      id: 1, 
      nombre: 'Alejandro',
      fecha: '08/09/12', 
      sexo: 'M', 
      grado: 'Kinder', 
      autobus: 'Autobús 1', 
      cabana: 'Cabaña1',
      equipo: 'equipo1'
    },
    {
      id: 2, 
      nombre: 'jorge',
      fecha: '08/12/12', 
      sexo: 'M', 
      grado: 'Kinder', 
      autobus: 'Autobús 1', 
      cabana: 'Cabaña1',
      equipo: 'equipo1'
    }, 
    {
      id: 0, 
      nombre: 'Diana',
      fecha: '02/10/12', 
      sexo: 'F', 
      grado: 'Kinder', 
      autobus: 'Autobús 1', 
      cabana: 'Cabaña1',
      equipo: 'equipo1'
    }
];
  expanded: any = {};
  timeout: any;

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
