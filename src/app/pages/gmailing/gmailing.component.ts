import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdmiService } from 'src/services/admi.service';
import { CampsService } from 'src/services/camps.service';


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
  template:string="";
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
  date = new Date();
  listaCampamentos;
  listaCapacitaciones;

  displayMaximizable=false;
  destinatariosStaff:any=[];
  destinatariosEscuela:any=[];
  destinatariosCampers:any=[];


  
  selectdestinatariosStaff:any=[];
  selectdestinatariosEscuela:any=[];
  selectdestinatariosCampers:any=[];
  listCamp:any = [];
  selectCapacitacion;
  botonDisiable:boolean=false


  templateAlmacenado:any;
  listaTemplateAlmacenado:any =[];
  tituloTemplateAlmacenado:any = "";
  page=1;



  constructor(private data:AdmiService,private formbBuilder:FormBuilder,private campInfo:CampsService) { 
    this.data.getTempletMasive().subscribe((res:any)=>{
    this.listaTemplates=res.data 
  })
  this.data.getPlantilla().subscribe((res:any)=>{
    this.tiposTemplates = res.data
  })
  this.campInfo.getCamps().subscribe((res:any)=>{
    this.listaCampamentos = res.data;
    console.log(res,'ñista de campamentos');
    
  })

  this.campInfo.getCampacitaciones().subscribe((res:any)=>{
    this.listaCapacitaciones = res.data;
    console.log(res,'ñista de campamentos');
    
  })

  }

  selectDestino(){ 
    this.botonDisiable=false
    let escuela=false;
    let staff=false;
    let campers=false;
    this.destinatariosStaff=[];
    this.destinatariosEscuela=[];
    this.destinatariosCampers=[];
  
    this.selectdestinatariosStaff=[];
    this.selectdestinatariosEscuela=[];
    this.selectdestinatariosCampers=[];
   this.publicoSelecionado.forEach(element => {
    if(element =='1'){campers=true;}
    else if(element =='2'){staff=true;}
    else if(element =='3'){escuela=true;}
   });

   this.campInfo.getParticipantes(this.campamento,campers,staff,escuela).subscribe((res:any)=>{
    console.log(res);
    this.listaTemplateAlmacenado= res.massive_templates

    this.selectdestinatariosCampers= res.campers
    this.destinatariosCampers= res.campers
    if(res.school){
      this.destinatariosEscuela.push( res.school);
     this.selectdestinatariosEscuela=this.destinatariosEscuela;
    }


    this.selectdestinatariosStaff= res.staffs
    this.destinatariosStaff= res.staffs

    this.botonDisiable=true

    
   })

  }
  selectDestinoMultiplesCamps(){
    this.botonDisiable=false
  this.destinatariosStaff=[];
  this.destinatariosEscuela=[];
  this.destinatariosCampers=[];

  this.selectdestinatariosStaff=[];
  this.selectdestinatariosEscuela=[];
  this.selectdestinatariosCampers=[];


   this.campInfo.getParticipantesMultiplesCamps(this.listCamp).subscribe((res:any)=>{
    console.log(res,'camps multiples');
    this.listaTemplateAlmacenado= res.massive_templates
    this.selectdestinatariosCampers= res.campers
    this.destinatariosCampers= res.campers
    if(res.school){
     this.destinatariosEscuela.push( res.school);
     this.selectdestinatariosEscuela=this.destinatariosEscuela;

    }
    


    this.selectdestinatariosStaff= res.staffs
    this.destinatariosStaff= res.staffs
    this.botonDisiable=true

   })

  }

  selectCapacitaciones(){
    this.botonDisiable=false

    this.destinatariosStaff=[];
    this.destinatariosEscuela=[];
    this.destinatariosCampers=[];
  
    this.selectdestinatariosStaff=[];
    this.selectdestinatariosEscuela=[];
    this.selectdestinatariosCampers=[];  

    this.campInfo.getParticipantesCapacitaciones(this.selectCapacitacion).subscribe((res:any)=>{
     console.log(res,'capacitaciones');
     this.listaTemplateAlmacenado= res.massive_templates
     this.selectdestinatariosStaff= res.staffs
     this.destinatariosStaff= res.staffs
     this.botonDisiable=true;
    })
 
   }

   refresh(){
    if(this.publicoSelecionado && this.publicoSelecionado.length >= 1){
      this.selectDestino();
    }
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
      this.editTemplate= false;

    }else if(a == 'Plantillas del sistemas'){
      this.Titulo='Plantillas del sistemas';
      this.data.getTempletSystem().subscribe((res:any)=>{
        this.listaTemplates=res.data 
      })
      this.editTemplate= false;

    }else if(a== 'Nuevo Templates'){
      this.Titulo='Nuevo Templates';
      this.editTemplate= false;


    }else if(a== 'Correos enviados'){
      this.data.getCorreos().subscribe((res:any)=>{
        this.listaTemplates=res.data 
      })
      this.Titulo='Correos enviados';
      this.editTemplate= false;


    }
  else if(a== 'Correos enviados'){
    this.Titulo='Correos enviados';
    this.editTemplate= false;
  }else if(a == 'Enviar Correo'){
    this.Titulo='Enviar Correo';
    this.editTemplate= false;
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
    }else if(this.Titulo ="Correos enviados"){
      this.typetemplate = 1
      this.data.getPlantillSelectMaisva(item.id).subscribe((res:any)=>{
        let a = res.data;
        console.log(res);
        
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

  selectTemplate(){
    let a:any =  this.listaTemplateAlmacenado.filter((res:any)=>{
        return    res.id == this.templateAlmacenado
    })
     this.data.getPlantillSelectMaisva(a[0].id).subscribe((res:any)=>{
        let b = res.data
        this.tituloTemplateAlmacenado =b.template_type;
        this.template =b.template;
        console.log(b);

      })
    
  }

  seguiente(){
    if(this.page<3){
        this.page=2;
    }
  }
  atras(){
    if(this.page>0){
      this.botonDisiable=false
        this.page=1
    }
  }
  cambios(){
    this.botonDisiable= false;

  }

}
