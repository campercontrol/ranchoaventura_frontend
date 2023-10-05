import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdmiService } from 'src/services/admi.service';


@Component({
  selector: 'app-gmailing',
  templateUrl: './gmailing.component.html',
  styleUrls: ['./gmailing.component.scss']
})
export class GmailingComponent implements OnInit {


  public Editor = ClassicEditor;
  term:any
  transactions:any=[];
  Titulo: string = "Plantillas"
  tipoTemplate:number;
  tipoPlantilla:number;
  typetemplate:number=1;
  tituloTempalet:string="";
  template:string;
  destinatario : number;
  capacitacion:any;
  campamento:any;
  listaTemplates:any=[];
  tiposTemplates:any=[];
  selectCatalogos:any=[];
  publico=[{value:"1",publico:"Campers"},{value:"2",publico:"Staff"},{value:"3",publico:"Escuelas"}]
  publicoSelecionado:any;
  statusRes:any = false;
  statuserror:any = false;
  editTemplate:any = false;
  updateTemplate:FormGroup;
  date = new Date()


  constructor(private data:AdmiService,private formbBuilder:FormBuilder) { 
    this.data.getTempletMasive().subscribe((res:any)=>{
    this.listaTemplates=res.data 
  })
  this.data.getPlantilla().subscribe((res:any)=>{
    this.tiposTemplates = res.data
  })

  }

  ngOnInit(): void {
    this.transactions = [
      {
        id: '#SK2540',
        name: 'Campamento numero 4',
       
      },
      {
        id: '#SK2541',
        name: 'Jamal Burnett',
        
      },
      {
        id: '#SK2542',
        name: 'Prueba de campamento',
        
      },
      {
        id: '#SK2543',
        name: 'Campamento numero 2',
        
      },
      {
        id: '#SK2544',
        name: 'Campamento cancelado'
      },
      {
        id: '#SK2545',
        name: 'Mensaje para padres',
       
      },
    ];
    this.updateTemplate = this.formbBuilder.group({
      "id": [0,Validators.required],
      "template_type": [0,Validators.required],
      "title": ["",Validators.required],
      "template": ["",Validators.required],
      "order":[0,Validators.required],
      "updated_at": this.date
    })
  }
   prueba(){
    console.log(this.template);
    
  }
  cretateTemplaet(){
    let templateTipo =0;
    if(this.typetemplate== 1){
      templateTipo=41
    }else{
      templateTipo= this.tipoTemplate;
    }
    let a = {
      "template_type": templateTipo,
      "title": this.tituloTempalet,
      "template": this.template,
      "order": 1,
    
    }
    this.data.createTemplate(a).subscribe((res:any)=>{
          if(res.data){
            this.statusRes= true;
            this.tituloTempalet="";
            this.template="";
            console.log(res);
            setTimeout(() => {
              this.statusRes=false;
              this.status('Plantillas')
            }, 1000);  
          }else{
            this.statuserror= true;
            setTimeout(() => {
              this.statuserror=false;
            }, 1000); 
          }
    })
  }

  status(a){
    if(a == 'Plantillas'){
      this.Titulo='Plantillas';
      this.data.getTempletMasive().subscribe((res:any)=>{
        this.listaTemplates=res.data 
      })
    }else if(a == 'Plantillas del sistemas'){
      this.Titulo='Plantillas del sistemas';
      this.data.getTempletSystem().subscribe((res:any)=>{
        this.listaTemplates=res.data 
      })
    }else if(a== 'Nuevo Templates'){
      this.Titulo='Nuevo Templates';

    }else if(a== 'Correos enviados'){
      this.data.getCorreos().subscribe((res:any)=>{
        this.listaTemplates=res.data 
      })
      this.Titulo='Correos enviados';

    }
  else if(a== 'Correos enviados'){
    this.Titulo='Enviar Correo';

  }

  }

  selectUpadate(item){
    this.editTemplate= true;
    if(this.Titulo ="Plantillas del sistemas"){
      this.typetemplate=2
      this.data.getPlantillSelect(item.id).subscribe((res:any)=>{
        let a = res.template
        this.updateTemplate.patchValue({
          "id": a.id,
          "template_type": a.template_type,
          "title": a.title,
          "template":a.template,
          "order":a.order,
          "updated_at": this.date
        })
      })
    }else if(this.Titulo ="Plantillas"){
      this.typetemplate = 1
      this.data.getPlantillSelectMaisva(item.id).subscribe((res:any)=>{
        let a = res.data
        this.updateTemplate.patchValue({
          "id": a.id,
          "template_type": a.template_type,
          "title": a.title,
          "template":a.template,
          "order":a.order,
          "updated_at": this.date
        })
      })
    }
   
    
  }

}
