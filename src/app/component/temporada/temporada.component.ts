import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CamperService } from 'src/services/camper.service';
import { CreateCampsService } from 'src/services/create-camps.service';
@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.scss']
})
export class TemporadaComponent implements OnInit {
  capacitaciones: any = [];
  selectCapcitacion: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  text: any;
  showButton:boolean = false;
  statuAgrgado = false;
  TextElimint="";
  idDalete=0;
  updateId =0;
  capacitacionesName:any = [];
  temporada:any = [];

  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  
  date :Date =new Date()

  

  public addTrainingForm: FormGroup = this.fb.group({
   
     
  "name": ["",[Validators.required]],
  "current": [true],
  "created_at": [this.date]
  })


 

  onSave () : void {
    this.showButton = true;
    console.log(this.addTrainingForm.value)
    this.catalogos.post_temporada(this.addTrainingForm.value).subscribe((res) => {
      console.log(res);
      this.showButton = false;

      this.addTrainingForm.reset();
      this.addTrainingForm.patchValue({
        "created_at": this.date

      })
      this.closeModal();
      this.getTrainig()
      },error=>{
        console.log(error);
        
      });
  }


  public Editor = ClassicEditor;


  constructor(private fb: FormBuilder, private catalogos: CamperService,private ca : CreateCampsService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
    this.getTrainig();
    this.ca.getTemporada().subscribe((res:any)=>{
      this.temporada = res.data
    })
  }
  async getTrainig(){

    this.capacitacionesName = await this.name()
   
    this.capacitaciones= await this.events();
    

   await this.nameCapa();
   console.log(this.capacitaciones,this.capacitacionesName);


   
    
  }


  async nameCapa(){
    this.capacitaciones.forEach(element => {
      this.capacitacionesName.forEach((item)=>{
        if(item.id == element.training_id){
          element.training =  item.name
        }
      })     
    });
    this.capacitaciones.forEach(element => {
      this.temporada.forEach((item)=>{
        if(item.id == element.season_id){
          element.season =  item.name
        }
      })     
    });
    

  }


   name(){
    return  new Promise((resolve,reject)=>{
      this.catalogos.getTraining().subscribe((res:any)=>{
        resolve(res.data);                
      },error=>{
        reject(error)
      })
    })
  }
  events(){
    return  new Promise((resolve,reject)=>{
      this.catalogos.get_temporada().subscribe((res:any)=>{
        resolve(res.data);                
      },error=>{
        reject(error)
      })
    })
  }


  

  
  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.addTrainingForm.patchValue({
      "created_at": this.date,
      "name":item.name,
      "current":item.current


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
  resteValu(){
    this.addTrainingForm.reset()
  }

  keepUpdate(){
    this.showButton = true;

    this.catalogos.patch_temp(this.addTrainingForm.value,this.updateId).subscribe((res: any) => {
     console.log(res);
      this.getTrainig();
      this.statuAgrgado = true;
      this.resteValu();
      this.showButton = true;

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
    this.catalogos.delet_temp(this.idDalete).subscribe((res: any) => {
      this.statuAgrgado = true;
      this.resteValu();
      this.getTrainig();
      if(res.detail.status == 1){
        alert('No se pudo Eliminar por favor intentelo mas tarde')
    }else{
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);

    }
    
     
    }, error => {
      
    })
  }

}