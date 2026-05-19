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
  escuelas:any = [];
  photoSelectUp : string | ArrayBuffer;
  tipoDepago = 4
  idioma = 'esp';
  totalRecords: number = 0;
  cargando =true;
 
  cat: any = {
    '0': 'ninguno',
    '1': 'Staff',
    '2': 'Acampador',
    '3': 'Staff y Acampador'
  }
  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  filtrosActivos: boolean = false;
  selectedCities: string[] = [];
  user_coordinator=false
  user_admin=false 
  searchName: string;
  searchLocation: null;
  searchSchool: null;
  listcatalogos: any;

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
    this.aCamp = res.data.items.filter((camp: any) => new Date(camp.camp_end) >= today);
  
    console.log(this.aCamp); // Mostrar los datos filtrados
    this.spiner=!this.spiner;
  });
  
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
      this.listcatalogos = aplicarOrdenFront(items);

      this.totalRecords = res.data.total;
      this.loading = false;
    });

  } else {

    this.camps.getCamp(page, perPage).subscribe((res: any) => {
      let items = res.data.items;

      // ORDENAMIENTO EN FRONT
      this.listcatalogos = aplicarOrdenFront(items);

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
