import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
import { CampsVistaService } from 'src/services/camps-vista.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
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
  headerInfo:boolean=true;
  headerCampers:boolean=true;
  headerStaffConf:boolean=true;
  headerStaffApun:boolean=true;




  rolSatff:any=[];
  staffApuntado:any=[];
  staff:any = [];
  staffNoselecionado:any = [];
  staffSelecionado:any = [];
  displayMaximizable2:boolean=false;
  modalConfir:boolean= false;
  selectRol:number=0;
  infoCamp:campss={
    id: 0,
    special_message: '',
    reminder_camp_days: 0,
    active: false,
    name: '',
    special_message_admin: '',
    reminder_discount_days: 0,
    start: undefined,
    public_price: 0,
    insurance: 0,
    general_camp: false,
    updated_at: undefined,
    end: undefined,
    show_payment_parent: false,
    venue: '',
    currency_id: 0,
    start_registration: undefined,
    show_rebate_parent: false,
    photo_url: '',
    location_id: 0,
    created_at: undefined,
    end_registration: undefined,
    show_paypal_button: false,
    photo_password: '',
    school_id: 0,
    uid: '',
    registration: false,
    show_payment_order: false,
    medical_report: '',
    season_id: 0,
    url: '',
    occupancy_camp: 0
  };
  cargando= false;
  

  idCamp = 0;
  activityValues: number[] = [0, 100];
  items = [];
  rol=0;
  

  constructor(private capms:CampsVistaService,private router :ActivatedRoute,private routerN: Router,private info : AuthenticationService) { 
  
    this.rol=this.info.infToken.role_id

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
    this.cargando= false;
    this.capms.getRolSatff().subscribe((res:any)=>{
      console.log(res);
      
      this.rolSatff= res.data
    });
    this.router.params.subscribe((res)=>{
        this.idCamp= res.id;
    })
    this.capms.getInfoCamp(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      this.infoCamp = res.camp
      this.listCampers = res.campers;
      this.listStaffConfirm = res.staff_confirmed;
      this.staffApuntado = res.staff_volunteer;
      this.cargando= true;
      
    })
    this.capms.getListaSatff().subscribe((res:any)=>{
      console.log(res);
      
      this.listaStaff = res.data;
    })

  }

  agregarStaffNoApuntado(){
    //console.log(this.staffNoselecionado);
    let a = [];
    this.cargando = false;
    this.staffNoselecionado.forEach(element => {
      console.log(element['Staff'].id);
      
      a.push(element['Staff'].id);   
    });
    //console.log(a);
    
    this.capms.aceptarStaff(this.idCamp,a).subscribe((res:any)=>{
      console.log(res);
      this.displayMaximizable=false;
      this.getInof()
      this.cargando = true;


      
    },error=>{
      alert('no se pudo agregar el staff por favor intentelo mas tarde');
      this.displayMaximizable=false;
      this.cargando = true;

    })
    
    
  }
  agregarStaffApuntado(){
    //console.log(this.staffNoselecionado);
    let a = [];
    this.cargando = false;

    this.staffSelecionado.forEach(element => {
     
      
      a.push(element.staff_id);   
    });
    //console.log(a);
    
    this.capms.aceptarStaff(this.idCamp,a).subscribe((res:any)=>{
      this.getInof()
      console.log(res);
      this.displayMaximizable2=false;
      this.cargando = true;


      
    },error=>{
      alert('no se pudo agregar el staff por favor intentelo mas tarde');
      this.displayMaximizable2=false;
      this.cargando = true;

    })
    
    
  }
  verStaff(id){
    this.routerN.navigate(['/dashboard/staff/perfil/'+id])

  }
  vercamper(id){
    this.routerN.navigate(['/dashboard/parents/inscription/camper/'+id])


  }

  selectstaff(){
    let a = [];
        this.cargando = false;

    this.selectedCustomers.forEach(element => {
     
      
      a.push(element.staff_id);   
    });
    this.capms.asignarRolStaff(this.idCamp,this.selectRol,a).subscribe((res:any)=>{
      this.getInof()
      this.modalConfir=false;
      this.cargando = true;

    },error=>{
      this.modalConfir=false;
      this.cargando = true;

      alert('No se pudo realizar la accion intentelo mas tarde')
    
    })
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  pulserac11(){
    this.capms.pulseras1x11(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      const dataBinary = [];
      dataBinary.push(res);
      const filePath =  window.URL.createObjectURL(new Blob(dataBinary,{type: 'application/pdf'}));
      const link = document.createElement('a');
      link.href =filePath;
      link.setAttribute('download','pulseras 1x11');
      document.body.appendChild(link);
      link.click();
 
    })
  }
  pulseras8() {
    this.capms.pulseras8hoja(this.idCamp).subscribe(
      (res: any) => {
        if (res instanceof Blob) {
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'pulsera 8');
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('La respuesta no es un Blob válido.');
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }
  
  pdfinfodecampers(){
    this.capms.Pdfinfodecampers(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      const dataBinary = [];
      dataBinary.push(res);
      const filePath =  window.URL.createObjectURL(new Blob(dataBinary,{type: 'application/pdf'}));
      const link = document.createElement('a');
      link.href =filePath;
      let titulo ='Informacion acamapadores'+" " +this.idCamp;
      link.setAttribute('download',titulo);
      document.body.appendChild(link);
      link.click();
 
    })
  }
}

export interface campss {
  id:                     number;
  special_message:        string;
  reminder_camp_days:     number;
  active:                 boolean;
  name:                   string;
  special_message_admin:  string;
  reminder_discount_days: number;
  start:                  string;
  public_price:           number;
  insurance:              number;
  general_camp:           boolean;
  updated_at:             string;
  end:                    string;
  show_payment_parent:    boolean;
  venue:                  string;
  currency_id:            number;
  start_registration:     string;
  show_rebate_parent:     boolean;
  photo_url:              string;
  location_id:            number;
  created_at:             string;
  end_registration:       string;
  show_paypal_button:     boolean;
  photo_password:         string;
  school_id:              number;
  uid:                    string;
  registration:           boolean;
  show_payment_order:     boolean;
  medical_report:         string;
  season_id:              number;
  url:                    string;
  occupancy_camp:         number;
}



