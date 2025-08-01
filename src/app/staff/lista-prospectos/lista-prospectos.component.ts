import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from 'src/services/staff.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { data } from 'jquery';
 import * as JSZip from 'jszip';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-prospectos',
  templateUrl: './lista-prospectos.component.html',
  styleUrls: ['./lista-prospectos.component.scss']
})
export class ListaProspectosComponent implements OnInit {
  selectedProducts: any[];

  product: any;
    spinner = false; 
    spinnerExcel = false;

  submitted: boolean;
  prospectoSeleccionado: any = null;

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
  constructor(private prospectos: StaffService,private modalService: NgbModal, private router:Router, private cdr: ChangeDetectorRef,private http: HttpClient) {

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
  reporteGeneralStaff() {
    this.spinnerExcel = true;
    this.prospectos.reportProspecto( ).subscribe({
      next: (response: any) => {
        const data = response;
  
       
  
        const headersMap: any = {
          'id': 'ID',
          'name': 'Nombre',
          'lastname_father': 'Apellido Paterno',
          'lastname_mother': 'Apellido Materno',
          'gender': 'Género',
          'email': 'Correo Electrónico',
          'curp': 'CURP',
          'rfc': 'RFC',
          'cellphone': 'Celular',
          'home_phone': 'Teléfono de Casa',
          'birthday': 'Fecha de Nacimiento',
          'affliction': 'Afección',
          'blood_type': 'Tipo de Sangre',
          'drug_allergies': 'Alergias a Medicamentos',
          'other_allergies': 'Otras Alergias',
          'nocturnal_disorders': 'Trastornos Nocturnos',
          'phobias': 'Fobias',
          'drugs': 'Medicamentos',
          'prohibited_foods': 'Alimentos Prohibidos',
          'bio': 'Biografía',
          'coordinator': 'Coordinador',
          'facebook': 'Facebook',
          'staff_contact_name': 'Contacto de Emergencia',
          'staff_contact_relation': 'Relación del Contacto',
          'staff_contact_homephone': 'Teléfono de Casa del Contacto',
          'staff_contact_cellphone': 'Celular del Contacto',
        };
  
        // Convertir los valores booleanos a "Sí" o "No"
        const modifiedData = data.map((row: any) => {
          const newRow: any = {};
  
          // Mapear claves conocidas
          for (const key in headersMap) {
            if (headersMap.hasOwnProperty(key)) {
              newRow[headersMap[key]] = row.hasOwnProperty(key) ? row[key] : '';
            }
          }
  
          // Incluir cualquier clave no mapeada (sin traducción)
          for (const key in row) {
            if (!headersMap.hasOwnProperty(key)) {
              newRow[key] = row[key];
            }
          }
  
          // Convertir valores booleanos a "Sí" o "No"
          for (const key in newRow) {
            if (typeof newRow[key] === 'boolean') {
              newRow[key] = newRow[key] ? 'Sí' : 'No';
            }
          }
  
          return newRow;
        });
  
        const translatedHeaders = Object.keys(headersMap).map(header => headersMap[header]);
  
        // Convertir los datos a una hoja de Excel
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(modifiedData, { header: translatedHeaders });
  
        // Ajustar el ancho de las columnas
        const columnWidths = translatedHeaders.map((header, index) => {
          const maxWidth = Math.max(...modifiedData.map((row: any) => (row[translatedHeaders[index]] || '').toString().length));
          return Math.max(header.length, maxWidth) + 2; // Agregar un margen extra
        });
  
        worksheet['!cols'] = columnWidths.map(width => ({ wpx: width * 10 }));
  
        // Crear un nuevo libro de trabajo
        const workbook: XLSX.WorkBook = { Sheets: { 'Datos': worksheet }, SheetNames: ['Datos'] };
  
        // Generar el archivo Excel
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.spinnerExcel = false;

        // Guardar el archivo
        this.saveAsExcelFile(excelBuffer, 'Reporte General prospecto ' );
      },
      error: (error) => {
        console.error('Error al obtener los datos del reporte general staff', error);
      }
    });
  }
  deleteProspect(id: number) {
    console.log(id);
    
    const url = ` https://api.kincamp.com/delete_prospect/${id}`;
    this.http.delete(url).subscribe({
      next: (res) => {
        console.log('Prospecto eliminado:', res);
 window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar prospecto:', err);
      }
    });
  }

openDeleteModal(content: any, prospecto: any) {
  this.prospectoSeleccionado = prospecto;
  this.modalService.open(content, { ariaLabelledBy: 'modal-delete-title' });
}

confirmarEliminacion(modal: any) {
  if (this.prospectoSeleccionado?.id) {
    this.deleteProspect(this.prospectoSeleccionado.id);
    modal.close();
  }
}
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';
  
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data, `${fileName}.xlsx`);
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
