import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampsService } from 'src/services/camps.service';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-preguntas-extras',
  templateUrl: './preguntas-extras.component.html',
  styleUrls: ['./preguntas-extras.component.scss']
})
export class PreguntasExtrasComponent implements OnInit {
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
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder,private camps: CampsService) {
    this.getCatalogos()
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
      question: ['', Validators.required],
      is_required: [false],
      camp_id: [0,[ Validators.required,Validators.min(1)]],
      created_at: [this.date, Validators.required]
    })

    this.camps.getCamps().subscribe((res:any)=>{
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

  getCatalogos() {
    this.catalogos.getcamp_extra_question().subscribe((res: any) => {
      this.listcatalogos = res.data;
      this.listcatalogos.map((item: any) => {
        item.assigned_id = this.cat[item.assigned_id.toString()];
      })
    });
  }

  guardar() {
    this.catalogos.postcamp_extra_question(this.formFood.value).subscribe((res: any) => {
      this.getCatalogos();
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
      question: "",
      is_required: false,
      camp_id:0,
    })
  }

  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.formFood.patchValue({
      question: item.question,
      is_required: item.is_required,
      camp_id:item.camp_id,
    })
  
    
  }

  keepUpdate(){
    this.catalogos.upddatcamp_extra_question(this.formFood.value,this.updateId).subscribe((res: any) => {
     console.log(res);
     
      this.getCatalogos();
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
    this.catalogos.deletcamp_extra_question(this.idDalete).subscribe((res: any) => {
      if(res.detail.status == 1){

      this.statuAgrgado = true;
      this.resteValu();
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);
    }else{
      alert('No se pudo eliminar esta en uso')

    }
    }, error => {
      alert('No se pudo eliminar')
    })
  }
  

}
