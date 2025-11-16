import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService } from 'src/services/catalogos.service';
import { CreateCampsService } from 'src/services/create-camps.service';
import { PaymentsService } from 'src/services/payments.service';

@Component({
  selector: 'app-listado-staff',
  templateUrl: './listado-staff.component.html',
  styleUrls: ['./listado-staff.component.scss']
})



export class ListadoStaffComponent implements OnInit {
  
  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  vacunas:any = [];
  selectHijos:any = [];
  resSearch:boolean = false; 
  spinner:boolean= false;
  sortField: string | null = null;
sortOrder: number | null = null;

  photoSelect : string | ArrayBuffer;
  photoSatus = false;
  spinerPhot= true;
   filters = {
    name: '',
    email: ''
  };
  table:boolean=true;

  location:any = [];
  temporada:any = [];
  school:any = [];
  currency:any = [];
  extra_question : any = [];
  extra_charges:any = [];
  alerQuestion = false;
  alercharges= false;
  extra_discounts = [];
  fecha = new Date();
  
  idDalete =0;
  updateId= 0;
  text: any;
  TextElimint="";
  date: Date = new Date();
  statuAgrgado = false;
  textos:any ={};
  licensed_medicines:any = [];
  pathological_background:any = [];
  pathological_background_fm:any = [];
  food_restrictions:any = [];
  payment_accounts:any = [];
  blood_types:any = [];
  vaccines:any = [];
  genders:any = [];
  grades:any = [];
  parent:any = [];
  escuelas:any = [];
  photoSelectUp : string | ArrayBuffer;
  idioma = 'esp';
  totalRecords: number = 0;
  cargando =true;
  informacion:any=[];
  moneda:any = [];
  metodosPagos:any = [];
  campamentos:any =[];
  displayEdit:boolean= false;
  nombrePadres:any = [];
  metodosPago:any = [];
  nameParent="";
  campersd:any = [];
  tipoTransacion=[];
  rol:any=[];
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
  selectedCities: string[] = [];
  

  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder, private render :Renderer2,private catalogos:CatalogosService,private paymants:PaymentsService,private routerAc :Router,    private cdr: ChangeDetectorRef
  ) {  
  }
  ngOnInit(): void {
    
    this.info(1)

  }
 
  info(page: number = 0, rows: number = 10) {

    this.catalogos.getStaff(page + 1, rows).subscribe(
      (staffResponse: any) => {
  
        let items = staffResponse.data.items;
  
        // Procesar tus campos como ya lo hacías
        items.forEach(element => {
          element.tipo = "Staff";
          element.combined = `${element.Staff.name} ${element.Staff.lastname_father} ${element.Staff.lastname_mother}`.toLowerCase();
        });
  
        // ---------------------------
        // ORDENAMIENTO SOLO EN FRONT
        // ---------------------------
        if (this.sortField) {
  
          items.sort((a: any, b: any) => {
  
            // resolver campo normal o anidado
            const getValue = (obj: any, field: string) => {
              if (field.includes('.')) {
                return field.split('.').reduce((o, k) => o?.[k], obj);
              }
              return obj[field];
            };
  
            const valA = getValue(a, this.sortField!);
            const valB = getValue(b, this.sortField!);
  
            if (valA == null) return 1 * this.sortOrder!;
            if (valB == null) return -1 * this.sortOrder!;
  
            if (valA < valB) return -1 * this.sortOrder!;
            if (valA > valB) return 1 * this.sortOrder!;
            return 0;
          });
        }
  
        // asignamos ya ordenado
        this.listcatalogos = items;
        this.totalRecords = staffResponse.data.total;
  
        this.cargando = false;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching staff:', error);
        this.cargando = false;
      }
    );
  }
  
  loadStaffLazy(event: any) {
    const page = event.first / event.rows;
    const rows = event.rows;
  
    // capturamos los datos de ordenamiento
    this.sortField = event.sortField;
    this.sortOrder = event.sortOrder;
  
    this.info(page, rows);
  }
  
  
  
hypervinculo(id:any){
  this.routerAc.navigate(['dashboard/staff/perfil/'+id])
}
buscarStaff(page: number = 1) {
  this.catalogos.searchStaff(this.filters, page).subscribe(
    (staffResponse: any) => {
      console.log(staffResponse.data, 'respuesta staff');
      this.listcatalogos = staffResponse.data.items;

      this.listcatalogos.forEach(element => {
        element.tipo = "Staff";
        element.combined = `${element.Staff.name} ${element.Staff.lastname_father} ${element.Staff.lastname_mother}`.toLowerCase();
      });

      this.totalRecords = staffResponse.data.total; // Guarda el total de registros

      this.cargando = false;
      this.cdr.detectChanges();
  }, error => {
    console.error('Error al buscar staff:', error);
  });
}

resetFilters() {
  this.filters = {
    name: '',
    email: ''
  };
  this.info(); // Buscar sin filtros
}

}
