import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupingService } from './grouping.service';
import { AdminService } from '../grouping-admi/admin.service';
import { AdminTipoAgrupacionesComponent } from '../admin-tipo-agrupaciones/admin-tipo-agrupaciones.component';
import { AdmitipoAgrupacionesService } from '../admin-tipo-agrupaciones/tipo-agrupacion.service';
import { switchMap } from 'rxjs/operators';
import { element } from 'protractor';
import { MessageService } from 'primeng/api';
import { error } from 'console';



@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.scss'],
  providers: [MessageService]
})
export class GroupingComponent  {
  datos= [{agrupación:"Camping",tipo:"Autobús", editar:'<a class=" btn btn-success">Editar</a>'}, {agrupación:"Camping2",tipo:"Autobús", editar:'<a class=" btn btn-success">Editar</a>'}]
  rows = [];
  temp = [];

  display4= false;
  
  breadCrumbItems: Array<{}>;
  listcatalogos:any ;
  spinner = false;
  modalVista :boolean= true;
  userGridData:any=[];
  selected;
  display3 = false;
  listCampers=[];
  userForm: FormGroup;
  submitted = false;
  items: FormArray;
  idCamp =0;
  tipoAgrupacion:any =[]
  grupos:any =[];
  selectGrupos = "";
  capMax = 0;
  capEdit = 0;
  edintGroup:any;
  groupingsList: string[] = [];
  idDelet:any ={};
  displayDeleteDialog= false;

  // Select2 Dropdown
  selectValue: string[];
  selecType:any =0;
  tipoAgrupaciosn:any=[];
  selectCatalogos:any=[]

  columns = [{ prop: 'agrupación' }, { name: 'Tipo' }, { name: 'Editar' } ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('content')content:ElementRef;
  listGruposImscritos=[];


  ColumnMode = ColumnMode;

  constructor(private messageService: MessageService,private modalService: NgbModal, private formBuilder: FormBuilder,private router:ActivatedRoute,private grouping:GroupingService,private listGrouping:AdminService, private listTypeAgrup:AdmitipoAgrupacionesService,private camps: AdmitipoAgrupacionesService) {
    this.rows=this.datos;
    this.temp=this.datos;


    this.listTypeAgrup.getAgrupaciones().pipe(
      switchMap((res: any) => {
        this.tipoAgrupacion = res;
        return this.listGrouping.getAgrupaciones();
      })
    ).subscribe((res: any) => {
      this.grupos   = res;
      console.log(this.grupos,'grupos');
      this.grupos = this.grupos.filter(item => item.is_active === true);
      this.grupos.forEach(element => {
       element.nameTipo = this.filterType( element.grouping_type_id );
       element.nameComplet =  element.nameTipo  + " | " + element.name
      });
      this.getGruposInscritos();

    });
    this.router.params.subscribe((res)=>{
      this.idCamp= res.id;
      this.grouping.getCamper(this.idCamp).subscribe((res:any)=>{
        console.log(res);
        this.listCampers = res.data;
     
      })
  })
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });
  }

  filterType (id){

  let b =   this.tipoAgrupacion.find(item => item.id ==id);
    
  return b.name
  }
  openasig(){
    this.listcatalogos = [];
    this.display3 = true;
  }
 

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
 
  openModal(content: any) {
    this.modalService.open(content);
    console.log(content);
    
  }

  openXl(content) {
		this.modalService.open(content, { size: 'xl' });
	}

  saveUser() {
    if (this.userForm.valid) {
      const name = this.userForm.get('name').value;
      const email = this.userForm.get('email').value;
      const designation = this.userForm.get('designation').value;
       this.userGridData.push({
         id: this.userGridData.length + 1,
         name,
         email,
         designation,
         projects: this.selected
       })
       this.modalService.dismissAll()
    }
    this.submitted = true
  }
  dateId(id){
    let b = id
  }


  hasGrouping(item: any, grouping: string): boolean {
    return item.groupings ? item.groupings.split(',').includes(grouping) : false;
  }
  getGruposInscritos(){
    // Obtener los grupos inscritos
    this.grouping.getGruposInscritos(this.idCamp).subscribe((res: any) => {
      this.listGruposImscritos = res.data;
      this.listGruposImscritos.forEach((item: any) => {
        item.nameCample = item.grouping+" ("+ item.type+")" + " | " + item.capacity; 
      });
      const gruposFiltrados = this.grupos.filter(grupo =>
        !this.listGruposImscritos.some(inscrito => 
          inscrito.nameTipo === grupo.type && inscrito.grouping === grupo.name
        )
      );
      this.grupos= gruposFiltrados      
      this.camps.getAgrupaciones().subscribe((res:any)=>{
      
        this.tipoAgrupaciosn = res
      })
      console.log(gruposFiltrados,'informacion');
    });
   
    
    
    // Obtener los campers y generar groupingsList
    this.grouping.getCamper(this.idCamp).subscribe((res: any) => {
      console.log(res);
      this.listCampers = res.data;
    
   
    });
  }

  createGroup(){
    let a = {
      "maximum_capacity": this.capMax,
      "camp_id": this.idCamp,
      "grouping_id": this.selectGrupos
    }
    this.grouping.createGroup(a).subscribe((res:any)=>{
      this.modalService.dismissAll(this.content);

      this.listTypeAgrup.getAgrupaciones().pipe(
        switchMap((res: any) => {
          this.tipoAgrupacion = res;
          return this.listGrouping.getAgrupaciones();
        })
      ).subscribe((res: any) => {
        this.grupos   = res;
        console.log(this.grupos,'grupos');
        this.grupos = this.grupos.filter(item => item.is_active === true);
        this.grupos.forEach(element => {
         element.nameTipo = this.filterType( element.grouping_type_id );
         element.nameComplet =  element.nameTipo  + " | " + element.name
        });
        this.getGruposInscritos();
      });
      this.selectGrupos ="0";
      this.capMax = 0;
    })
  }

    changeGrups(id: any) {
      const tipo = id.type;
      console.log(this.listCampers, id);
      this.selecType = id.id
console.log(this.listCampers);

      this.listcatalogos = this.listCampers.filter(item => {
        // Filtra solo los elementos donde ninguno de los `grouping_type_name` es igual a `tipo`
        return !item.groupings.some(element => element.grouping_type_name === tipo);
      });
      
    
   
  }
  EditchangeGrups(id:any){
    console.log(id);
    
    this.edintGroup = id;
    this.edintGroup.maximum_capacity = this.capEdit;

    const capEdit2 :any= id.capacity;

    let valorDespuesDeSlash: any = capEdit2.split('/')[1];
    valorDespuesDeSlash  = Number(valorDespuesDeSlash);
    this.capEdit = valorDespuesDeSlash;
    this.edintGroup.maximum_capacity = this.capEdit;

  }
  saveEdite (){
    this.edintGroup.maximum_capacity =this.capEdit
    this.edintGroup.camp_id = this.idCamp;
    this.spinner = true;
    this.grouping.editraCapcidadMaxima(this.edintGroup.id,this.edintGroup).subscribe((res:any)=>{
     

      this.listTypeAgrup.getAgrupaciones().pipe(
        switchMap((res: any) => {
          this.tipoAgrupacion = res;
          this.spinner = false;
            this.display4 = false
          return this.listGrouping.getAgrupaciones();
        })
      ).subscribe((res: any) => {
        this.grupos   = res;
        console.log(this.grupos,'grupos');
        this.grupos = this.grupos.filter(item => item.is_active === true);
        this.grupos.forEach(element => {
         element.nameTipo = this.filterType( element.grouping_type_id );
         element.nameComplet =  element.nameTipo  + " | " + element.name
        });
        this.getGruposInscritos();
      });
      this.selectGrupos ="0";
      this.capMax = 0;
    })
  }
  saveGrouping() {
    const campersToAdd = this.selectCatalogos.map((element: any) => ({
      camper_id: element.id,
      grouping_camp_id: this.selecType,
    }));

    this.spinner = true;
    this.grouping.campersInscritos(campersToAdd).subscribe(
      (res: any) => {
        this.handleResponseStatus(res);
        this.updateGroupings();
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error, los campers no se añadieron correctamente.' });
        this.spinner = false;
      }
    );
  }

  private handleResponseStatus(res: any) {
    let severityType = 'info';

    switch (res.status) {
      case 1:
        severityType = 'success';  // Éxito
        this.listcatalogos = [];

        break;
      case 2:
        severityType = 'warn';    // Advertencia para capacidad excedida
        this.listcatalogos = [];

        break;
      case 3:
      case 4:
        severityType = 'error';   // Errores para duplicidad en agrupación y agrupación de mismo tipo
        this.listcatalogos = [];

        break;
      default:
        severityType = 'error';   // Cualquier otro error no manejado
    }

    // Mostrar el mensaje directamente desde `detail` proporcionado por el backend
    this.messageService.add({ severity: severityType, summary: 'Resultado', detail: res.detail });
  }

  private updateGroupings() {
    this.listTypeAgrup.getAgrupaciones()
      .pipe(
        switchMap((res: any) => {
          this.tipoAgrupacion = res;
          return this.listGrouping.getAgrupaciones();
        })
      )
      .subscribe((res: any) => {
        this.grupos = res.filter(item => item.is_active === true);
        this.grupos.forEach(element => {
          element.nameTipo = this.filterType(element.grouping_type_id);
          element.nameComplet = `${element.nameTipo} | ${element.name}`;
        });
        this.getGruposInscritos();
        this.spinner = false;
        this.display3 = false;
      });
  }



  resetGroupingU(data){
    if (data === null) {
      return null;
    } else {
      return data.split(',');
    }
  }


  getGroupingName(camper: any, groupingTypeId: number): string {
  // Filtra las agrupaciones que coincidan con el grouping_type_id
  const groupings = camper.groupings.filter((g: any) => g.grouping_type_id === groupingTypeId);
  // Si existen agrupaciones con el mismo tipo, concatena los nombres, si no, retorna '-'
  return groupings.length > 0 ? groupings.map(g => g.name).join(', ') : '-';
}


deletGrping(camper: any, groupingTypeId: number){

  const groupings = camper.groupings.filter((g: any) => g.grouping_type_id === groupingTypeId);
  // Si existen agrupaciones con el mismo tipo, concatena los nombres, si no, retorna '-'
  console.log(groupings[0]);
  this.idDelet= groupings[0];  
  this.displayDeleteDialog =true;
  //*this.grouping.deletGruping(item.)
}
confirmDelet(){
  this.grouping.deletGruping(this.idDelet.grouping_camper_id).subscribe({
    next:(response) =>{
      console.log(response,'respuesta de error');
      
      this.listTypeAgrup.getAgrupaciones()
      .pipe(
        switchMap((res: any) => {
          this.tipoAgrupacion = res;
          return this.listGrouping.getAgrupaciones();
        })
      )
      .subscribe((res: any) => {
        this.grupos = res.filter(item => item.is_active === true);
        this.grupos.forEach(element => {
          element.nameTipo = this.filterType(element.grouping_type_id);
          element.nameComplet = `${element.nameTipo} | ${element.name}`;
        });
        this.getGruposInscritos();
        this.spinner = false;
        this.displayDeleteDialog =false;
      });
    },error:(error)  =>{
        console.error(error);
    }

  }
    
  )
}



customSort(event: any, target: 'campers' | 'catalogos'): void {
  const field = event.field;
  const order = event.order;

  const list = target === 'campers' ? this.listCampers : this.listcatalogos;

  list.sort((a, b) => {
    let value1 = this.getSortingValue(a, field);
    let value2 = this.getSortingValue(b, field);

    // Si es fecha
    if (field === 'birthday') {
      value1 = new Date(value1).getTime();
      value2 = new Date(value2).getTime();
    }

    let result = 0;
    if (value1 == null && value2 != null) result = -1;
    else if (value1 != null && value2 == null) result = 1;
    else if (value1 == null && value2 == null) result = 0;
    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

    return order * result;
  });
}

getSortingValue(item: any, field: string): any {
  if (field.startsWith('grouping')) {
    const index = parseInt(field.replace('grouping', ''), 10);
    const visibleGroupings = this.getVisibleGroupings();
    const grouping = visibleGroupings[index]; // 👈 alineado con las columnas que se pintan
    return this.getGroupingName(item, grouping.id);
  }
  return item[field];
}




getUsedGroupingTypes(): number[] {
  const usedTypes = new Set<number>();

  this.listCampers.forEach(camper => {
    camper.groupings.forEach((g: any) => {
      usedTypes.add(g.grouping_type_id);
    });
  });

  return Array.from(usedTypes);
}
getVisibleGroupings() {
  const usedTypes = this.getUsedGroupingTypes();
  return this.tipoAgrupaciosn.filter((g: any) => usedTypes.includes(g.id));
}

 



  

}
