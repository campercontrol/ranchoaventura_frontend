import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CamperService } from 'src/services/camper.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eventos-capacitaciones',
  templateUrl: './eventos-capacitaciones.component.html',
  styleUrls: ['./eventos-capacitaciones.component.scss'],
  providers:[DatePipe]
})
export class EventosCapacitacionesComponent implements OnInit {
  capacitaciones: any = [];
  eventos: any = [];
  temporada:any = [];
  selectCapcitacion: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  text: any;
  statuAgrgado = false;
  TextElimint="";
  idDalete=0;
  spinner = false;
  updateId =0;

  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  
  date :Date =new Date()

  public addTrainingForm: FormGroup = this.fb.group({
    "start": [""],
    "end":  [""],
    "location":  [""],
    "open_enrollment": [true],
    "active": [true],
    "season_id": [1],
    "training_id": [1],
  })


  subiendo(event: any) {
    const archivo = event.target.files[0];
    const formulario = new FormData();
    formulario.append('file', archivo)
    this.catalogos.setPhoto(formulario).subscribe((res: any) => {
      console.log(res.path);
      this.addTrainingForm.patchValue({
        photo: res.path
      })
    })
  }

  onSave () : void {
    this.spinner= true;
    console.log(this.addTrainingForm.value)
    this.catalogos.postEventos(this.addTrainingForm.value).subscribe((res) => {
      this.addTrainingForm.reset();
      this.spinner=false;
      this.addTrainingForm.patchValue({
        "start": "",
        "end":  "",
        "location":  "",
        "open_enrollment": true,
        "active": true,
        "season_id": 1,
        "training_id": 1,
      })
      this.getTrainig()
      this.closeModal();
      },error=>{
        console.log(error);
        
      });
  }


  public Editor = ClassicEditor;


  constructor(private fb: FormBuilder, private catalogos: CamperService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
    this.getTrainig();
  }
  getTrainig(){
    this.catalogos.getTemporadas().subscribe((res:any)=>{
      this.temporada = res.data;
      console.log(this.eventos);  
    })
    this.catalogos.getTraining().subscribe((res:any)=>{
      this.capacitaciones = res.data;
      console.log(this.capacitaciones);  
    })
    this.catalogos.getEventos().subscribe((res:any)=>{
      this.eventos = res.data;
      console.log(this.eventos);  
    })
    
  }


  searchCap(id){
    let a = this.capacitaciones.filter((res:any)=>{
      return res.id == id
    })
    return a[0].name
  }
  searchTemp(id){
    let a = this.temporada.filter((res:any)=>{
      return res.id == id
    })
    return a[0].name
  }

  
  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.addTrainingForm.patchValue({
      "start":     this.datePipe.transform(item.start, 'dd-mm-yyy HH:mm:ss')
      ,
      "end":      this.datePipe.transform(item.end, 'dd-mm-yyy HH:mm:ss')
      ,
      "location":  item.location,
      "open_enrollment":item.open_enrollment,
      "active": item.active,
      "season_id": item.season_id,
      "training_id": item.training_id,
      "id":this.updateId

    })
  
    
  }
  showDialog() {
    this.display = true;
  }
  reset(){
    this.display = true;

    this.addTrainingForm.patchValue({
      "start": "",
      "end":  "",
      "location":  "",
      "open_enrollment": true,
      "active": true,
      "season_id": 1,
      "training_id": 1,
    })
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
    this.spinner= true;
    this.catalogos.updateTrainingEvent(this.addTrainingForm.value,this.updateId).subscribe((res: any) => {
     console.log(res);
      this.getTrainig();
      this.statuAgrgado = true;
      this.resteValu();
      this.spinner=false;
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
    this.TextElimint='Deseas Eliminar '+ name + '  de la lista de capacitaciones';
    this.display3 = true; 
   
  }

  delet(){
    this.catalogos.deletTraining(this.idDalete).subscribe((res: any) => {
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

  parseHTMLContent(html: any): string {
    const regex = /<[^>]*>/g;
    return html.replace(regex, '');
  }
}
