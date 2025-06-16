import { Component, ElementRef, LOCALE_ID, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { CampsService } from 'src/services/camps.service';
import { LangService } from 'src/services/lang.service';
import { MercadoPagoService } from './mercado-pago.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import jwt_decode from "jwt-decode";
registerLocaleData(localeEs, 'es');


@Component({
  selector: 'app-campamento',
  templateUrl: './campamento.component.html',
  styleUrls: ['./campamento.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],

})
export class CampamentoComponent implements OnInit {
  textos= {
    "esp":{
      titulo:"Campamento:",
      texto1:"Fecha:",
      texto2:"Salida:",
      texto3:"Regreso:",
      texto4:" Punto de reunión:",
      texto5:"Lugar del campamento:",
      texto6:"Mas informacion:",
      texto7:"Contraseña",
      texto8:"Cobertura Póliza: ",
      texto9:"Precio del camp: ",
      texto10:"Fotos:",
      texto11:"Detalle de pagos",
      texto12:"Tu saldo actual es de:",
      texto13:" Una vez realizado el pago envianos tu comprobante a  pagos@campercontrol.com indicando nombre completo del acampador. Tu pago se verá reflejado en nuestro sistema en un lapso de 48 horas hábiles.",
      texto14:"Favor de consultar el estado de los pagos con el colegio",
      th:"Fecha",
      th1:"Descripcion",
       th2:"Cargo", 
       th3:"Abono", 
       th4:"Saldo",
    },
    "eng":{
      titulo:"Camp :",
      texto1:"Dates:",
      texto2:"Exit:",
      texto3:"Camp ends:",
      texto4:"Meeting Point:",
      texto5:"Location:",
      texto6:"More info:",
      texto7:"Contraseña: ",
      texto8:"Coverage policy: ",
      texto9:"Camp price: ",
      texto10:"Camp photos",
      texto11:"Payments detail",
      texto12:"Current balance: ",
      texto13:"Once the payment is made, send us your voucher to pagos@campercontrol.com indicating the full name of the participant.Your payment will be reflected in our system within 48 working hours.",
      texto14:"Please check the status of payments with the school",
      th:"Date",
      th1:"Details",
       th2:"Charge", 
       th3:"Credit", 
       th4:"Account balance",



    }

  }
  dialogResponsiveOptions = [
    {
      breakpoint: '1024px',
      width: '70vw',
    },
    {
      breakpoint: '768px',
      width: '90vw',
    },
    {
      breakpoint: '560px',
      width: '100vw',
    }
  ];
  
  idCamper=0;
  idCamp=0;
  cargosExtr= false;
  dataCamp:any;
  dataPagos:any={};
  extra_questions:any=[];
  extra_charges:any=[];
  nameCamp:any={};
  idoma:string='esp'
  cargosExtras:any ;
  PreguntasExtras:any ;
  respuestPregunta:any="";
  cargosExtra:false;
  inscripcion = true;
  loadingMercadoPago = false;
  

  estatusPago:Boolean= false;
  pagos:boolean=false;
  statusInscri:boolean=false;
  location= "";
  typeSucribe:number = 0;
  balance = 0;
  @ViewChild('baucher') baucher ? :ElementRef;
  cargando= false;
  displayModal = false;
  showMercadopago:boolean = false;
  paymentsMp:any;

  declare  MercadoPago: any;
  pagoMercado:number=0;
  fechadePagos:any=[]
  rol=0;
  spinner = false;
  showCancelDialog= false;

  constructor(private mercadoPagoService: MercadoPagoService,private hijos:CamperService,private camps:CampsService,private routesA:ActivatedRoute,private modalService: NgbModal, private router:Router,private render:Renderer2,private lang:LangService,private routerNav:Router,private info : AuthenticationService) { 

    this.rol=this.info.infToken.role_id
    
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
        this.pagoMercado = this.balance;
        console.log(res.camper_subscribe,'aasas');
        this.location = res.location
        
        this.statusInscri = res.camper_subscribe;
        this.dataCamp = a;
        this.dataPagos = res.payments;
        console.log(this.dataCamp,'aa');
        this.cargando= true;
        this.fechadePagos = this.arrayToJsonString(this.dataCamp.recommended_payment_dates)
        if(this.dataCamp.show_mercadopago_button == true){this.linkMercadoPago()}
        console.log(this.fechadePagos,'informacion');
        
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
    this.lang.getLang().subscribe((res:any)=>{
      this.idoma=res
      console.log(this.idoma);
      
    })


  }
 
  removeHtmlTags(inputString: string): string {
    if (!inputString) {
      return ''; // Devuelve una cadena vacía si el string es null o undefined
    }
    // Usamos una expresión regular para eliminar todas las etiquetas HTML
    return inputString.replace(/<\/?[^>]+(>|$)/g, '');
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

  arrayToJsonString(jsonString: string | null | undefined): any[] {
    if (jsonString !== null && jsonString !== undefined) {
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.error("Error al parsear JSON:", error);
        return [];
      }
    }
    return [];
  }
  getQuestion(){
    this.camps.getPreguntas(Number(this.idCamp),Number(this.idCamper)).subscribe((res:any)=>{
      console.log(res,'preguntas');
       this.PreguntasExtras = res.data;
       this.PreguntasExtras.forEach((element:any) => {
            element.question= this.parseHTMLContent(element.question)
       });

    
       console.log(this.PreguntasExtras,'preguntas');

       
     });
     
     this.camps.getCargosExtras(this.idCamper,this.idCamp).subscribe((res:any)=>{
     console.log(res,'cargos extras');
       this.cargosExtras = res.data
       console.log(this.cargosExtras,'cargos extras');
 
       
     })
  }

  inscribirCamps(){
    this.cargosExtr= true;
    this.typeSucribe=1;
  }
  incio(){
    this.router.navigate(['dashboard/parents'])
  }
  perfil(){
    this.router.navigate(['dashboard/parents/camper/'+this.idCamper])
  }
  saveRes(){
    let b :any[]=[];
    this.spinner = true;
    this.PreguntasExtras.forEach(element => {
        let a = {
          
            "answer": element.answer,
            "id": element.camper_extra_answer_id,
           
          
        }
         b.push(a);
    });

    this.camps.answer(b).subscribe((res:any)=>{
      console.log(res);
      this.getQuestion()
      this.modalService.dismissAll()
      this.spinner = false;
      
    })
   
   
 
  }
  saveChange(){
    this.spinner= true
    let a = [];
      this.cargosExtras.forEach(element => {
         a.push(
          {     
            id :element.camper_extra_charge_id,
                  is_selected: element.extra_selected} )
   

          
      });
    let res = {
      "extra_charges":this.cargosExtras
    }

    this.camps.extras(a).subscribe((res:any)=>{
      console.log(res);
      this.getQuestion()
      this.modalService.dismissAll()
      this.spinner= false
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

  suscribeCamps(id:any){
    if(id >0){
      let a = [this.idCamp]       
      this.camps.setCamps(a,this.idCamper).subscribe((res:any)=>{
        console.log(res);
        
        if(res.status ==2){
          this.extra_questions = res.extra_questions;
          this.extra_questions.forEach(element => {
              if (element.camp_extra_question_question) {
                  element.camp_extra_question_question = this.parseHTMLContent(element.camp_extra_question_question);
              }
          });
          this.extra_charges = res.extra_charges;
          this.inscripcion = false;
          this.cargosExtr = false;
          
          this.displayModal =true;

        } else if(res.status ==1){
          this.routerNav.navigate(['dashboard/parents/camp-info/'+this.idCamper+'/'+this.idCamp]);
  
        }   
        
        
        
       },
       (error)=>{
         console.log(error)
       })
    }else{
      this.cargosExtr= false;
    }
   
  }

  parseHTMLContent(html: string): string {
    const regex = /<[^>]*>/g;
    return html.replace(regex, '');
  }

  enviarCargosPreguntas(){
    this.extra_charges.forEach(element => {
      if(element.camp_extra_charge_is_selected == null){
          element.camp_extra_charge_is_selected=false
      }
    });
    
    let b:any ={
      extra_answers:this.extra_questions,
      extra_charges:this.extra_charges
    }
    console.log(b);
    
   this.camps.setCargosPregustas(this.idCamper,b).subscribe((res:any)=>{
    console.log(res);
    if(res.status == 1){
      window.location.reload();
     
  
    }
  
  })
    
    
  }

  linkMp(){
    this.loadingMercadoPago = true;
    this.mercadoPagoService.createPreference(this.idCamp,this.idCamper,this.pagoMercado).subscribe({
      next:(response)=>{

        const link = response.init_point;
        window.location.href = link;


      }

    })

  }
  

  linkMercadoPago(){
    this.loadingMercadoPago = true;
    this.mercadoPagoService.tablereference(this.idCamp,this.idCamper).subscribe({
      next:(response)=>{

        this.paymentsMp = response
      }

    })

  }

  mapStatus(status: string): string {
    const statusMap = {
      pending: 'Pendiente',
      approved: 'Aprobado',
      authorized: 'Autorizado',
      in_process: 'En Proceso',
      in_mediation: 'En Mediación',
      rejected: 'Rechazado',
      cancelled: 'Cancelado',
      refunded: 'Reembolsado',
      charged_back: 'Contracargo',
    };
    return statusMap[status] || 'Desconocido';
  }

  // Devuelve la clase CSS dependiendo del estatus
  getStatusClass(status: string): string {
    return `status-${status.replace('_', '-')}`;
  }
  
}




export interface Camp {
  end:                    string;
  show_payment_parent:    boolean;
  insurance:              number;
  general_camp:           boolean;
  start_registration:     Date;
  recommended_payment_dates: string;
  show_mercadopago_button: boolean;
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
