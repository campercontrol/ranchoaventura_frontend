import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCapacitacionesComponent } from 'src/app/staff/lista-capacitaciones/lista-capacitaciones.component';
import { AdmiService } from 'src/services/admi.service';
import { CatalogosService } from 'src/services/catalogos.service';
@Component({
  selector: 'app-campercomment',
  templateUrl: './campercomment.component.html',
  styleUrls: ['./campercomment.component.scss']
})
export class CampercommentComponent implements OnInit {
  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  idDalete =0;
  updateId= 0;
  listCampers:any = [];
  text: any;
  TextElimint="";
  listUser:any=[];
  formFood: FormGroup;
  date: Date = new Date();
  statuAgrgado = false;
  cat: any = {
    "0": "Sin Grupo",
    "1": "Tutor",
    "2": "Staff",
    "3": "Escuela",
    "4": "Cordinador",
    "5": "Admi",
    "6": "Teacher",
    "7": "Doctor"
  }
  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  constructor(private catalogos: AdmiService, private _FormBuild: FormBuilder) {
    this.getCatalogos()
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
      comment: ['', Validators.required],
      is_public: [true,],
      show_to: [0, Validators.required],
      camp_id: [0, Validators.required],
      user_id: [0, Validators.required],
      camper_id: [0, Validators.required],
      updated_at: [this.date, Validators.required],

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
    this.catalogos.getComments().subscribe((res: any) => {
      console.log(res);      
      this.listcatalogos = res.data;

    });
    this.catalogos.getCampers().subscribe((res: any) => {
      console.log(res);
      
      this.listCampers = res.data;

    });
    this.catalogos.getUsers().subscribe((res: any) => {
      console.log(res);
      
      this.listUser = res.data;

    });
  }

  guardar() {
    this.catalogos.postComments(this.formFood.value).subscribe((res: any) => {
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
      is_public: [true,],
      show_to: 0,
      camp_id: 0,
      user_id: 0,
      camper_id: 0,
      updated_at: this.date,
    })
  }

  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.formFood.patchValue({
      comment: item.comment,
      is_public: item.is_public,
      show_to: item.show_to,
      camp_id: item.user_id,
      user_id:item.camp_id,
      camper_id: item.camper_id
    })
  
    
  }

  keepUpdate(){
    this.catalogos.updateComments(this.formFood.value,this.updateId).subscribe((res: any) => {
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
    this.catalogos.deletComments(this.idDalete).subscribe((res: any) => {
      if(res.detail.status == 1){

        this.statuAgrgado = true;
      this.resteValu();
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);
      }else{
        alert('No se pudo eliminar debido a que esta isncrito a campamentos')

      }
      

    }, error => {
      alert('No se pudo Agregar')
    })
  }

}
