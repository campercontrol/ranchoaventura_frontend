import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from 'src/services/staff.service';

@Component({
  selector: 'app-lista-prospectos',
  templateUrl: './lista-prospectos.component.html',
  styleUrls: ['./lista-prospectos.component.scss']
})
export class ListaProspectosComponent implements OnInit {
  selectedProducts: any[];

  product: any;
    spinner = false;

  submitted: boolean;
  totalRecords: number = 0;
  selectedCustomers: any[];
  loading: boolean = false;
  customer:any =[];
  idCamps:any[]=[];
  filters = {
    name: '',
    email: '',
    page: 1,
    per_page: 10,
    order: 'desc'
  }
  id= 0;
  cargando:boolean=false;
  prospectosArray:any=[]
  constructor(private prospectos: StaffService,private modalService: NgbModal, private router:Router, private cdr: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.cargando=false;

    this.getProspecto();
  }




  filterCamps(){
    this.selectedCustomers.forEach((item)=>{
       
        this.setCamp(item.id);
    }) ;
    this.cargando=true;
   this.modalService.dismissAll();  
  }
  
  
  setCamp(a){

    this.prospectos.aceptarProspectos(a).subscribe((res:any)=>{
      this.getProspecto(); 
    })
  }

  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	
	}

  infostaff(id){
    this.router.navigate(['dashboard/staff/perfil/'+id]);

  }
  getProspecto(page: number = 1, per_page: number = 10) {
    // Activa el spinner o estado de carga
  this.cargando = false
    this.prospectos.getProspectos(page, per_page).subscribe((res: any) => {
      console.log(res);
      this.spinner = true;
      // Mapea los prospectos para extraer la info del Staff
      const arrayTemp: any[] = [];
      res.data.items.forEach((item: any) => {
        // Actualiza o asigna datos necesarios en Staff
        item.Staff.email = item.email;
        item.Staff.season_name = item.season_name;
        arrayTemp.push(item.Staff);
      });
      this.prospectosArray = arrayTemp;
      // Guarda el total de registros para la paginación
      this.totalRecords = res.data.total;
      this.cargando = false;
    }, error => {
      console.error('Error fetching prospectos:', error);
      this.cargando = false;
    });
  }
  loadProspectosLazy(event: any) {
    // event.first: índice del primer elemento de la página actual (empezando en 0)
    // event.rows: cantidad de registros por página
    const page = (event.first / event.rows) + 1; // El backend espera páginas iniciando en 1
    const rows = event.rows;
    this.getProspecto(page, rows);
  }
  buscarProspectos() {
    this.loading = true;
    this.prospectos.getProspectosSearch(this.filters).subscribe((res) => {
      this.spinner = true;
      // Mapea los prospectos para extraer la info del Staff
      const arrayTemp: any[] = [];
      res.data.items.forEach((item: any) => {
        // Actualiza o asigna datos necesarios en Staff
        item.Staff.email = item.email;
        item.Staff.season_name = item.season_name;
        arrayTemp.push(item.Staff);
      });
      this.prospectosArray = arrayTemp;
      // Guarda el total de registros para la paginación
      this.totalRecords = res.data.total;
      this.cargando = false;
      this.loading = false;
    });
  }
  
  resetFilters() {
    this.filters = {
      name: '',
      email: '',
      page: 1,
      per_page: 10,
      order: 'desc'
    };
    this.getProspecto();
  }
  
  
  
}
