import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
import { CampsVistaService } from 'src/services/camps-vista.service';
import { ActivatedRoute, RouterEvent } from '@angular/router';
@Component({
  selector: 'app-campamentos-staff',
  templateUrl: './campamentos-staff.component.html',
  styleUrls: ['./campamentos-staff.component.scss'],
  providers: [AdvancedService, DecimalPipe]

})
export class CampamentosStaffComponent implements OnInit {


  selectedCustomers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = false;
  displayMaximizable: boolean;
  listCampers:any= [];
  listStaffConfirm:any= [];
  listaStaff:any=[];
  rolSatff:any=[];
  staffApuntado:any=[];
  staff:any = [];
  staffNoselecionado:any = [];
  staffSelecionado:any = [];
  displayMaximizable2:boolean=false;
  modalConfir:boolean= false;
  selectRol:number=0;
  

  idCamp = 0;
  activityValues: number[] = [0, 100];
  items = [];
  

  constructor(private capms:CampsVistaService,private router :ActivatedRoute) { 
  
   
  }
  cars = [{ Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  ]
  customer = [{id:2, name: "Alberto Ulises Hernandez Cruz", record: { n: 2, b: 2, d: 3 }, precio: 5500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }
    , {id:3, name: "Arueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 2500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: false },
  {id:4, name: "Lrueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 5500, sede: "aLos Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }]

  ngOnInit(): void {
    this.getInof();

  }

  getInof(){
    this.capms.getRolSatff().subscribe((res:any)=>{
      console.log(res);
      
      this.rolSatff= res.data
    });
    this.router.params.subscribe((res)=>{
        this.idCamp= res.id;
    })
    this.capms.getInfoCamp(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      this.listCampers = res.campers;
      this.listStaffConfirm = res.staff_confirmed;
      this.staffApuntado = res.staff_volunteer
      
    })
    this.capms.getListaSatff().subscribe((res:any)=>{
      console.log(res);
      
      this.listaStaff = res.data;
    })

  }

  agregarStaffNoApuntado(){
    //console.log(this.staffNoselecionado);
    let a = [];
    this.staffNoselecionado.forEach(element => {
      console.log(element['Staff'].id);
      
      a.push(element['Staff'].id);   
    });
    //console.log(a);
    
    this.capms.aceptarStaff(this.idCamp,a).subscribe((res:any)=>{
      console.log(res);
      this.displayMaximizable=false;

      
    },error=>{
      alert('no se pudo agregar el staff por favor intentelo mas tarde');
      this.displayMaximizable=false;

    })
    
    
  }
  agregarStaffApuntado(){
    //console.log(this.staffNoselecionado);
    let a = [];
    this.staffSelecionado.forEach(element => {
     
      
      a.push(element.staff_id);   
    });
    //console.log(a);
    
    this.capms.aceptarStaff(this.idCamp,a).subscribe((res:any)=>{
      console.log(res);
      this.displayMaximizable2=false;

      
    },error=>{
      alert('no se pudo agregar el staff por favor intentelo mas tarde');
      this.displayMaximizable2=false;

    })
    
    
  }

  selectstaff(){
    let a = [];
    this.selectedCustomers.forEach(element => {
     
      
      a.push(element.staff_id);   
    });
    this.capms.asignarRolStaff(this.idCamp,this.selectRol,a).subscribe((res:any)=>{
      this.modalConfir=false;
    },error=>{
      this.modalConfir=false;
      alert('No se pudo realizar la accion intentelo mas tarde')
    
    })
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
}
}


