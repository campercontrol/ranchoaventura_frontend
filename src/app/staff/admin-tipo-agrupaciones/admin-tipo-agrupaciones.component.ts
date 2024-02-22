import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampsService } from 'src/services/camps.service';
import { CatalogosService } from 'src/services/catalogos.service';
import { AdmitipoAgrupacionesService } from './tipo-agrupacion.service';

@Component({
  selector: 'app-admin-tipo-agrupaciones',
  templateUrl: './admin-tipo-agrupaciones.component.html',
  styleUrls: ['./admin-tipo-agrupaciones.component.scss']
})
export class AdminTipoAgrupacionesComponent implements OnInit {

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
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder,private camps: AdmitipoAgrupacionesService) {
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
      name: ['', Validators.required],
      
    })

    this.camps.getAgrupaciones().subscribe((res:any)=>{
      this.campsArray = res.data
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
      camp_id:0,
      currency_id:0,
      price:0,
      created_at:this.date
    })
  }

  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.formFood.patchValue({
      name: item.name,
     

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
    this.catalogos.deletcamp_extra_charge(this.idDalete).subscribe((res: any) => {
      this.statuAgrgado = true;
      this.resteValu();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);

    }, error => {
      alert('No se pudo Agregar')
    })
  }
  

}
