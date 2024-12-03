import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CamperService } from 'src/services/camper.service';


@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss']
})
export class CreateTrainingComponent implements OnInit {
  capacitaciones: any = [];
  selectCapcitacion: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  text: any;
  spinner = false;
  statuAgrgado = false;
  TextElimint="";
  idDalete=0;
  updateId =0;

  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  
  date :Date =new Date()

  public addTrainingForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    photo: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.min(0)]],
    url: ['', [Validators.required, Validators.min(0)]],
    active: [true, [Validators.required]],
    created_at: [this.date]
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
    this.spinner = true;
    this.catalogos.postTraining(this.addTrainingForm.value).subscribe((res) => {
      console.log(res);
      this.spinner = false;
      this.addTrainingForm.reset();
      this.getTrainig()
      this.closeModal();
      },error=>{
        this.spinner = false;
        console.log(error);
        
      });
  }


  public Editor = ClassicEditor;


  constructor(private fb: FormBuilder, private catalogos: CamperService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
    this.getTrainig();
  }
  getTrainig(){
    this.catalogos.getTraining().subscribe((res:any)=>{
      this.capacitaciones = res.data;
      this.capacitaciones.forEach((element:any) => {
        element.description = this.parseHTMLContent(element.description )
        
      });
      console.log(this.capacitaciones);
      
    })
  }

  
  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.addTrainingForm.patchValue({
      id:this.updateId,
      name: item.name,
      photo: item.photo,
      description:item.description,
      url: item.url,
      active:item.active,

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
    this.spinner = true;
    this.catalogos.updateTraining(this.addTrainingForm.value,this.updateId).subscribe((res: any) => {
     console.log(res);
      this.getTrainig();
      this.statuAgrgado = true;
      this.resteValu();
      this.spinner = false;
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal2();
      }, 1000);

    }, error => {
      console.log(error);
      this.spinner = false;
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
