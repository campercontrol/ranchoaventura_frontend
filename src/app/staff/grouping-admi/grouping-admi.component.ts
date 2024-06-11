import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmiService } from 'src/services/admi.service';
import { CampsService } from 'src/services/camps.service';
import { CatalogosService } from 'src/services/catalogos.service';
import { AdminService } from './admin.service';


@Component({
  selector: 'app-grouping-admi',
  templateUrl: './grouping-admi.component.html',
  styleUrls: ['./grouping-admi.component.scss']
})
export class GroupingAdmiComponent implements OnInit {


  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  idDalete =0;
  updateId= 0;
  text: any;
  TextElimint="";
  formFood: FormGroup;
  date: Date = new Date();
  statuAgrgado = false;
  cat: any = {
    '0': 'ninguno',
    '1': 'Staff',
    '2': 'Acampador',
    '3': 'Staff y Acampador'
  }
 campsArray :any = [];
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  listTypeAgrrup:any =[]
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder,private camps: AdminService) {
    this.camps.getAgrupaciones().subscribe((res:any)=>{
      console.log(res);
      
      this.listcatalogos = res
    })

    this.camps.typgetAgrupaciones().subscribe((res:any)=>{
      this.listTypeAgrrup =res
    })
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
      name: ['', Validators.required],
      grouping_type_id: ['', Validators.required],
      is_active: [true, Validators.required]


      
    })

 
  }


  showDialog() {
    this.display = true;
  }
  showDialog2() {
    this.display2 = true;
  }
  closeModal() {
    this.display = false;

  }

  closeModal3() {
    this.display3 = false;

  }
  closeModal2() {
    this.display2 = false;
    this.resteValu();

  }

  

  guardar() {
    this.camps.postAgrupaciones(this.formFood.value).subscribe((res: any) => {
      this.statuAgrgado = true;
      this.resteValu();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal();
      }, 1000);

    }, error => {
      alert('No se pudo Agregar')
    })

  }

  resteValu() {
    this.formFood.reset();
    this.formFood.patchValue({
      name: "",
      is_active:true,
      grouping_type_id:0,

    })
  }

  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.formFood.patchValue({
      name: item.name,
      is_active:item.is_active,
      grouping_type_id:item.grouping_type_id,
     

    })
  
    
  }

  keepUpdate(){
    this.camps.updateAgrupaciones(this.formFood.value,this.updateId).subscribe((res: any) => {
     console.log(res);
     
      this.statuAgrgado = true;
      this.resteValu();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal2();
      }, 1000);

    }, error => {
      console.log(error);
      
      alert('No se pudo Agregar')
    })
  }


  deletModal(name,id){
    this.idDalete= id;
    this.TextElimint='Deseas Eliminar '+ name + '  del catalogo';
    this.display3 = true; 
   
  }

  delet(){
    this.camps.deletGruping(this.idDalete).subscribe((res: any) => {
      if(res.detail.status == 1){

      this.statuAgrgado = true;
      this.resteValu();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);
    }else{
      alert('No se pudo eliminar debido a que esta en uso')

    }

    }, error => {
      alert('No se pudo eliminar')
    })
  }
  


}
