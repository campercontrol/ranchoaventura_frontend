import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './advanced.model';

import { tableData, editableTable } from './data';

import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective,SortEvent } from './advanced-sortable.directive';
import { CreateCampsService } from 'src/services/create-camps.service';

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
  customer:any =[]

constructor(private camps: CreateCampsService) { }
cars=[{Nombre:"Campamento con agrupaciones",grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 " },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "},    
  ]

  ngOnInit(): void {
     this.camps.getCamp().subscribe((res:any)=>{
      this.customer = res.data;
      console.log(this.customer);
      
     })
  }
}


