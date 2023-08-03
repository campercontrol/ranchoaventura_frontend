import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { CampsService } from 'src/services/camps.service';

@Component({
  selector: 'app-campamento',
  templateUrl: './campamento.component.html',
  styleUrls: ['./campamento.component.scss']
})
export class CampamentoComponent implements OnInit {

  idCamper=0;
  idCamp=0;
  dataCamp:Camp;
  dataPagos:any={};
  nameCamp:any={};
  cargosExtras:any ;
  PreguntasExtras:any ;
  respuestPregunta:any="";
  cargosExtra:false;
  estatusPago:Boolean= false;
  pagos:boolean=false;
  statusInscri:boolean=false;
  location= "";
  balance = 0;
  @ViewChild('baucher') baucher  :ElementRef;
  cargando= false;


  constructor(private hijos:CamperService,private camps:CampsService,private routesA:ActivatedRoute,private modalService: NgbModal, private router:Router,private render:Renderer2) { 
    this.routesA.params.subscribe((params)=>{
      this.idCamp = params['camp'];
    //  console.log(this.idCamp);
      
    })
    this.routesA.params.subscribe((params)=>{
      this.idCamper = params['camper'];
      //console.log(this.idCamper);

    })
    this.hijos.informacionCampamento(Number(this.idCamper),Number(this.idCamp)).subscribe((res:any)=>{
      //console.log(res);
      console.log(res,'respuesta');
        let a :any=res.camp
        this.balance= res.payment_balance;
        console.log(res.camper_subscribe,'aasas');
        this.location = res.location
        
        this.statusInscri = res.camper_subscribe;
        this.dataCamp = a;
        this.dataPagos = res.payments;
        console.log(this.dataCamp,'aa');
        this.cargando= true;
        
        if(this.dataPagos){
          this.dataPagos.length> 0 ? this.pagos =true:this.pagos=false;   

        }

     //console.log(this.dataPagos,'aqui la info');
        this.getQuestion();
       
      },error=>{
        alert('no se pudo cargar')
      });
  }

  ngOnInit(): void {
  }


  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
		
	}
  getcamps(){
    this.camps.getCamp(this.idCamp).subscribe((res:any)=>{
    //  console.log(res.data);
      this.dataCamp = res.data;
      
  //   console.log(this.dataPagos,'aqui la info');
      
      this.dataPagos.length> 0 ? this.pagos =true:this.pagos=false;   
      this.cargando= true;
    })

  }
  getQuestion(){
    this.camps.getPreguntas(Number(this.idCamp),Number(this.idCamper)).subscribe((res:any)=>{
     // console.log(res,'preguntas');
       this.PreguntasExtras = res.data;

    
       console.log(this.PreguntasExtras,'preguntas');

       
     });
     
     this.camps.getCargosExtras(this.idCamper,this.idCamp).subscribe((res:any)=>{
     console.log(res,'cargos extras');
       this.cargosExtras = res.data
       console.log(this.cargosExtras,'cargos extras');
 
       
     })
  }
  incio(){
    this.router.navigate(['dashboard'])
  }
  perfil(){
    this.router.navigate(['dashboard/parents/camper/'+this.idCamper])
  }
  saveRes(){
    let b :any[]=[];
    this.PreguntasExtras.forEach(element => {
        let a = {
          
            "id": element.id,
            "question": element.question,
            "is_required": true,
            "camper_id": this.idCamper,
            "answer": element.answer
          
        }
        b = b.concat(a);
    });
   
    let question = {
      extra_answers:b
    }
      this.camps.setPreguntas(question).subscribe((res:any)=>{
        console.log(res);
        this.getQuestion();
        
      });
  }
  saveChange(){
    
      this.cargosExtras.forEach(element => {
          element.camper_id = this.idCamper
          element.is_selected = true
      });
    let res = {
      "extra_charges":this.cargosExtras
    }

    this.camps.setPagos(res).subscribe((res:any)=>{
      console.log(res);
      this.modalService.dismissAll()
      
    })
    
   

  }
  deletCamp(){
    this.camps.deletCamp(this.idCamper,this.idCamp).subscribe((res:any)=>{
      console.log(res);
      //alert ('se cancelo la inscripcion correctamente')
      window.location.reload();

    },error=>{
      console.log(error);
      
    })
  }
  getBaucher(){
    this.hijos.getBauch(this.idCamper,this.idCamp).subscribe((res:any)=>{
      console.log(res);
      const dataBinary = [];
      dataBinary.push(res);
      const filePath =  window.URL.createObjectURL(new Blob(dataBinary,{type: 'application/pdf'}));
      const link = document.createElement('a');
      link.href =filePath;
      link.setAttribute('download','ficha de pago');
      document.body.appendChild(link);
      link.click();

     
      
    })
  }

}




export interface Camp {
  end:                    string;
  show_payment_parent:    boolean;
  insurance:              number;
  general_camp:           boolean;
  start_registration:     Date;
  show_rebate_parent:     boolean;
  venue:                  string;
  currency_id:            number;
  updated_at:             Date;
  end_registration:       Date;
  show_paypal_button:     boolean;
  photo_url:              string;
  location_id:            number;
  created_at:             Date;
  uid:                    string;
  registration:           boolean;
  paypal_button:          string;
  photo_password:         string;
  school_id:              number;
  id:                     number;
  url:                    string;
  show_payment_order:     boolean;
  medical_report:         string;
  season_id:              number;
  name:                   string;
  special_message:        string;
  reminder_camp_days:     number;
  occupancy_camp:         number;
  start:                  string;
  special_message_admin:  string;
  reminder_discount_days: number;
  public_price:           number;
  active:                 boolean;
}
