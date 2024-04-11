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



@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.scss']
})
export class GroupingComponent  {
  datos= [{agrupación:"Camping",tipo:"Autobús", editar:'<a class=" btn btn-success">Editar</a>'}, {agrupación:"Camping2",tipo:"Autobús", editar:'<a class=" btn btn-success">Editar</a>'}]
  rows = [];
  temp = [];
  
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
  // Select2 Dropdown
  selectValue: string[];
  selecType:any =0;
  selectCatalogos:any=[]

  columns = [{ prop: 'agrupación' }, { name: 'Tipo' }, { name: 'Editar' } ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('content')content:ElementRef;
  listGruposImscritos=[];


  ColumnMode = ColumnMode;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,private router:ActivatedRoute,private grouping:GroupingService,private listGrouping:AdminService, private listTypeAgrup:AdmitipoAgrupacionesService) {
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
        this.listCampers.forEach((item:any)=>{
          item.groupings = this.resetGroupingU(item.groupings)
        })
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
  getGruposInscritos(){
    this.grouping.getGruposInscritos(this.idCamp).subscribe((res:any)=>{
      this.listGruposImscritos = res.data;
      this.listGruposImscritos.forEach((item:any)=>{
        item.nameCample =  item.type + " | " + item.grouping;
      })
    })
    this.grouping.getCamper(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      this.listCampers = res.data;
      this.listCampers.forEach((item:any)=>{
        item.groupings = this.resetGroupingU(item.groupings)
      })
    })
  }


  createGroup(){
    let a = {
      "maximum_capacity": this.capMax,
      "camp_id": this.idCamp,
      "grouping_id": this.selectGrupos
    }
    this.grouping.createGroup(a).subscribe((res:any)=>{
      this.modalService.dismissAll(this.content);
      this.selectGrupos ="0";
      this.capMax = 0;
    })
  }

  changeGrups(id:any){
    console.log(id);
    this.selecType = id.id
    
      this.grouping.getCampersInscritos(id.id).subscribe((res:any)=>{
        console.log(res);
        this.listcatalogos = res;
        
      })
  }
  saveGrouping(){
    console.log(this.selectCatalogos);
    let b = [];
    this.spinner = true;
    this.selectCatalogos.forEach((element:any)=>{
      b.push({"camper_id":element.id,"grouping_camp_id":this.selecType})
    })

    this.grouping.campersInscritos(b).subscribe((res:any)=>{
      console.log(res,'se isncribio correctamenta');
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
        this.spinner = false;
        this.display3 = false

      });
    })
    
  }

  resetGroupingU(data){
    if (data === null) {
      return null;
    } else {
      return data.split(',');
    }
  }

}
