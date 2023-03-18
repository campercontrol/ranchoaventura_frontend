import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-campamentos',
  templateUrl: './mis-campamentos.component.html',
  styleUrls: ['./mis-campamentos.component.scss']
})
export class MisCampamentosComponent implements OnInit {
  selectedCustomers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

cars=[{Nombre:"Campamento con agrupaciones nuevas agrpaciones de campamento",grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 " },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "},    
  ]

  customer=[{name: "Campamento con agrupaciones nuevas agrpaciones de campament ",record:{n:2,b:2,d:3},precio:5500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}
  ,{name: "Arueba de Nombre",record:{n:12,b:2,d:3},precio:2500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"},
  {name: "Lrueba de Nombre",record:{n:12,b:2,d:3},precio:5500,sede:"aLos Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}]


  constructor() { }

  ngOnInit(): void {
  }

}
