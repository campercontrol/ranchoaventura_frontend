import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CampsService } from 'src/services/camps.service';
import { CreateCampsService } from 'src/services/create-camps.service';
import { StaffService } from 'src/services/staff.service';

@Component({
  selector: 'app-medical-component',
  templateUrl: './medical-component.component.html',
  styleUrls: ['./medical-component.component.scss']
})
export class MedicalComponentComponent implements OnInit {
  selectedProducts: any[];

  product: any;

  spiner= false;
  submitted: boolean;
  selectedCustomers: any[];
  loading: boolean = false;
  customer:any =[];
  idCamps:any[]=[];
  id= 0;
  prospectosArray:any=[];
  pCamp:any = [];// inscripcion cap
  aCamp:any = [];// apuntado a camps
  ICamp:any = []; // confirmacion de camps
  complete_profile = false;
  is_active = false;
  is_employee = false;
  alerts:boolean;
  rol:any =0;
  user_coordinator=false
  user_admin=false 

  constructor( private staff:StaffService, private info : AuthenticationService,private router: Router,private camps: CreateCampsService) {
    this.getCamps();
    this.rol=this.info.infToken.role_id;
    this.user_admin = info.infToken.user_admin ;
    this.user_coordinator= info.infToken.user_coordinator ;
   }

  ngOnInit(): void {
  }
 getCamps(){
  this.spiner=!this.spiner;

  this.camps.getCamp().subscribe((res: any) => {
    console.log(res, 'respuesta');
  
    const today = new Date(); // Fecha actual
  
    // Filtrar los datos cuya fecha `camp_end` aún no ha pasado
    this.aCamp = res.data.filter((camp: any) => new Date(camp.camp_end) >= today);
  
    console.log(this.aCamp); // Mostrar los datos filtrados
    this.spiner=!this.spiner;
  });
  
 }
  }
