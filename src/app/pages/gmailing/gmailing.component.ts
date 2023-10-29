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
  cargando:boolean=false;


  
  selectdestinatariosStaff:any=[];
  selectdestinatariosEscuela:any=[];
  selectdestinatariosCampers:any=[];
  listCamp:any = [];
  selectCapacitacion;
  botonDisiable:boolean=false


  templateAlmacenado:any;
  listaTemplateAlmacenado:any =[];
  tituloTemplateAlmacenado:any = "";
  asuntoTemplateAlmacenado:any = "";

  page=1;
  edtitar=1;
  idUpdate=0;;



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
    this.selectdestinatariosStaff.forEach((camps:any)=>{
      camps.id = camps.id;

   });
   this.destinatariosStaff= res.staffs;
   this.destinatariosStaff.forEach((camps:any)=>{
    camps.id = camps.staff_id;

 });

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
    this.selectdestinatariosStaff.forEach((camps:any)=>{
      camps.id = camps.id;

   });
   this.destinatariosStaff= res.staffs;
   this.destinatariosStaff.forEach((camps:any)=>{
    camps.id = camps.staff_id;

 });
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
     this.selectdestinatariosStaff.forEach((camps:any)=>{
        camps.staff_full_name = camps.name;
        camps.id = camps.id;
        camps.staff_email = camps.email;

     });
     this.destinatariosStaff= res.staffs;
     this.destinatariosStaff.forEach((camps:any)=>{
      camps.staff_full_name = camps.name;
      camps.id = camps.id;

   });
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
      this.cargando=true;
      this.Titulo='Plantillas';
      this.data.getTempletMasive().subscribe((res:any)=>{
        this.listaTemplates=res.data ;
        this.cargando=false;

      })
      this.editTemplate= false;

    }else if(a == 'Plantillas del sistemas'){
      this.Titulo='Plantillas del sistemas';
      this.cargando=true;

      this.data.getTempletSystem().subscribe((res:any)=>{
        this.listaTemplates=res.data 
        this.cargando=false;

      })
      this.editTemplate= false;

    }else if(a== 'Nuevo Templates'){
      this.Titulo='Nuevo Templates';
      this.editTemplate= false;


    }else if(a== 'Correos enviados'){
      this.cargando=true;

      this.data.getCorreos().subscribe((res:any)=>{
        this.listaTemplates=res.data ;
        this.cargando=false;

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
      this.idUpdate=item.id
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

  updateTemplaet(){
    
    this.data.patchPlantilla(this.idUpdate,this.updateTemplate.value).subscribe((res:any)=>{
         console.log(res);
         if(res.mensaje =='Actualizado Correctamente'){
          this.statusRes= true;
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

  templateInfor(id:any){
   let b = this.listaTemplateAlmacenado.filter((ote:any)=>{
      return  ote.id == id;
    })

    return b[0]
  }

  createEmail(){
    let template:any =  this.templateInfor(this.templateAlmacenado)
    let a = {}
    let  schools_id = []
        this.selectdestinatariosEscuela.forEach(element => {
            schools_id.push(element.school_id)
        });
        let  staffs_id = []
        this.selectdestinatariosStaff.forEach(element => {
            schools_id.push(element.id)
        });
        let  campers_id = []

        this.selectdestinatariosCampers.forEach(element => {
          schools_id.push(element.camper_id)
      });
        let camp_id = [];
        this.listCamp.forEach(element => {
          schools_id.push(element.id)
      });
      console.log(this.tipoTemplate);
      
    switch (Number(this.tipoTemplate)) {
      case 1:
      
       a = {
          "campaign": {
           
            "name": this.tituloTemplateAlmacenado,
            "camp_parents": true,
            "camp_staff": true,
            "camp_school": true,
            "active_time": "1",
            "send": true,
            "camp_id": this.campamento,
            "send_type_id": 80,
            "template_id": template.id,
          },
          "campers_id":campers_id,
          "staffs_id": staffs_id,
          "schools_id": schools_id,
          "template_title": template.title,
          "template_body": this.template
        }

        console.log(a);
        this.campInfo.createEmail(a).subscribe((res:any)=>{
          console.log(res);
          if(res==1){
            alert('Se enviaron los correos correctamente');
            this.page=1;
            this.status('Correos enviados')

          }
          
        });
        
        break;
      case 2:
       
        this.selectdestinatariosCampers.forEach(element => {
          schools_id.push(element.camper_id)
      });
       a = {
          "campaign": {
           
            "name": this.tituloTemplateAlmacenado,
            "camp_parents": false,
            "camp_staff": true,
            "camp_school": false,
            "active_time": "1",
            "send": true,
            "send_type_id": 81,
            "template_id": template.id,
          },
          "campers_id":[],
          "staffs_id": staffs_id,
          "schools_id": [],
          "template_title": template.title,
          "template_body": this.template
        }
        console.log(a);
        this.campInfo.createEmail(a).subscribe((res:any)=>{
          console.log(res);
          if(res==1){
            alert('Se enviaron los correos correctamente');
            this.page=1;
            this.selectUpadate('Correos enviados')

          }
        });
        
        break;
      case 3:
        a = {
          "campaign": {
           
            "name": this.tituloTemplateAlmacenado,
            "camp_parents": true,
            "camp_staff": true,
            "camp_school": true,
            "active_time": "1",
            "send": true,
            "send_type_id": 82,
            "template_id": template.id,
          },
          "campers_id":campers_id,
          "staffs_id": staffs_id,
          "schools_id": schools_id,
          "template_title": template.title,
          "camp_id": camp_id,

          "template_body": this.template
        }
        console.log(a);
        this.campInfo.createEmail(a).subscribe((res:any)=>{
          console.log(res);
          if(res==1){
            alert('Se enviaron los correos correctamente');
            this.page=1;
            this.selectUpadate('Correos enviados')

          }
        });
        break;
      default:
        console.log('Opción no reconocida');
        break;
    }
  }

}
