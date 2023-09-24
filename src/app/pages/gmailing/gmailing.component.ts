import { Component, OnInit } from '@angular/core';
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
  selectCatalogos:any=[];
  publico=[{value:"1",publico:"Campers"},{value:"2",publico:"Staff"},{value:"3",publico:"Escuelas"}]
  publicoSelecionado:any;
  statusRes:any = false;
  statuserror:any = false;


  constructor(private data:AdmiService) { 
    this.data.getTempletMasive().subscribe((res:any)=>{
    this.listaTemplates=res.data 
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

  }
   prueba(){
    console.log(this.template);
    
  }
  cretateTemplaet(){
    let a = {
      "template_type": this.tipoTemplate,
      "title": this.tituloTempalet,
      "template": this.template,
      "order": 0,
    
    }
    this.data.createTemplate(a).subscribe((res:any)=>{
          if(res.data){
            this.statusRes= true;
            this.tituloTempalet="";
            this.template="";
            console.log(res);
            setTimeout(() => {
              this.statusRes=false;
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

    }else if(a== 'Enviar Correo'){
      this.Titulo='Enviar Correo';

    }

  }

}
