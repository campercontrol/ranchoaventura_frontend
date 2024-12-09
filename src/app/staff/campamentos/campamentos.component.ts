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


  
  selectedCustomers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];
  customer:any =[];
  rol_id = 0;
  info:any ;

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
     this.camps.getCamp().subscribe((res:any)=>{
      console.log(res,'respuesta');
      
      this.customer = res.data;
      console.log(this.customer);
      
     })
  }

  reditCamps(id){
    if(this.rol_id==3){
      this.router.navigate(['dashboard/medical/camp-medical/'+id])

    }else{
      this.router.navigate(['dashboard/camp/'+id])

    }
    
  }
}


