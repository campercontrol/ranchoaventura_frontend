import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabla-medical',
  templateUrl: './tabla-medical.component.html',
  styleUrls: ['./tabla-medical.component.scss']
})
export class TablaMedicalComponent implements OnInit {
  selectedCustomers: any[];

    representatives: any[];
    @ViewChild("op") element: ElementRef;


    statuses: any[];

    loading: boolean = false;
    diagnostio:string="";
    displayMaximizable:boolean=false;

    activityValues: number[] = [0, 100];
    op: any;

  constructor() { }
  cars=[{Nombre:"Campamento con agrupaciones nuevas agrpaciones de campamento",grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 " },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "},    
    ]

    customer=[{name: "Campamento con agrupaciones nuevas agrpaciones de campament ",record:{n:2,b:2,d:3},precio:5500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}
    ,{name: "Arueba de Nombre",record:{n:12,b:2,d:3},precio:2500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"},
    {name: "Lrueba de Nombre",record:{n:12,b:2,d:3},precio:5500,sede:"aLos Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}]

  ngOnInit(): void {
  }
  valores(datos:any){
    console.log(datos)
    this.diagnostio=datos.name

  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
}
 

}
