import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './advanced.model';

import { tableData, editableTable } from './data';

import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective,SortEvent } from './advanced-sortable.directive';
import { CreateCampsService } from 'src/services/create-camps.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-campamentos',
  templateUrl: './campamentos.component.html',
  styleUrls: ['./campamentos.component.scss'],
  providers: [AdvancedService, DecimalPipe]

})
export class CampamentosComponent implements OnInit {

  totalRecords: number = 0;
  loading: boolean = false;
  customer: any[] = [];
  
  selectedCustomers: any[];
  spiner : boolean = true;
  representatives: any[];

  statuses: any[];

 
  activityValues: number[] = [0, 100];
   rol_id = 0;
  info:any ;
 

  // Filtros de búsqueda
  searchName: string = '';
  searchLocation: number | null = null;
  searchSchool: number | null = null;

  // Para mantener estado de filtros activos
  filtrosActivos = false;
constructor(private camps: CreateCampsService,private router :Router, private token:AuthenticationService) {
  this.rol_id =token.infToken.role_id;
  this.info= token

 }
cars=[{Nombre:"Campamento con agrupaciones",grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 " },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
{Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "},    
  ]

  ngOnInit(): void {
    this.spiner = false;
    this.loadCampsLazy({ first: 0, rows: 10 });

  }

  reditCamps(id){
    if(this.rol_id==3){
      this.router.navigate(['dashboard/medical/camp-medical/'+id])

    }else{
      this.router.navigate(['dashboard/camp/'+id])

    }
    
  }


  loadCampsLazy(event: any) {
    this.loading = true;
  
    const page = Math.floor(event.first / event.rows) + 1;
    const perPage = event.rows;
  
    const sortField = event.sortField;
    const sortOrder = event.sortOrder; // 1 asc, -1 desc
  
    const aplicarOrdenFront = (items: any[]) => {
      if (!sortField) return items; // si no están usando las flechas, no ordenar
  
      return items.sort((a: any, b: any) => {
        // soporte para campos anidados "record.n"
        const valA = sortField.includes('.')
          ? sortField.split('.').reduce((o, k) => o?.[k], a)
          : a[sortField];
  
        const valB = sortField.includes('.')
          ? sortField.split('.').reduce((o, k) => o?.[k], b)
          : b[sortField];
  
        if (valA == null) return 1 * sortOrder;
        if (valB == null) return -1 * sortOrder;
  
        if (valA < valB) return -1 * sortOrder;
        if (valA > valB) return 1 * sortOrder;
        return 0;
      });
    };
  
    if (this.filtrosActivos) {
      this.camps.searchCamps(
        this.searchName,
        this.searchLocation,
        this.searchSchool,
        page,
        perPage
      ).subscribe((res: any) => {
        let items = res.data.items;
  
        // ORDENAMIENTO EN FRONT
        this.customer = aplicarOrdenFront(items);
  
        this.totalRecords = res.data.total;
        this.loading = false;
      });
  
    } else {
  
      this.camps.getCamp(page, perPage).subscribe((res: any) => {
        let items = res.data.items;
  
        // ORDENAMIENTO EN FRONT
        this.customer = aplicarOrdenFront(items);
  
        this.totalRecords = res.data.total;
        this.loading = false;
      });
  
    }
  }
  
  buscarCampamentos() {
    this.filtrosActivos = true;
    this.loadCampsLazy({ first: 0, rows: 10 });
  }

  resetFiltros() {
    this.searchName = '';
    this.searchLocation = null;
    this.searchSchool = null;
    this.filtrosActivos = false;
    this.loadCampsLazy({ first: 0, rows: 10 });
  }
}


