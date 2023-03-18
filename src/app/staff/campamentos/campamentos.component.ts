import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './advanced.model';

import { tableData, editableTable } from './data';

import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective,SortEvent } from './advanced-sortable.directive';

@Component({
  selector: 'app-campamentos',
  templateUrl: './campamentos.component.html',
  styleUrls: ['./campamentos.component.scss'],
  providers: [AdvancedService, DecimalPipe]

})
export class CampamentosComponent implements OnInit {


  
  selectedCustomers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

constructor() { }
cars=[{Nombre:"Campamento con agrupaciones",grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 " },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "},    
  ]

  customer=[{name: "Prueba de Nombre subiendo ",record:{n:2,b:2,d:3},precio:5500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}
  ,{name: "Arueba de Nombre",record:{n:12,b:2,d:3},precio:2500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"},
  {name: "Lrueba de Nombre",record:{n:12,b:2,d:3},precio:5500,sede:"aLos Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}]

  ngOnInit(): void {
    
  }
}


