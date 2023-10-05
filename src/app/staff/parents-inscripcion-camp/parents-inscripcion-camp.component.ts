import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { CampsService } from 'src/services/camps.service';
import { LangService } from 'src/services/lang.service';


@Component({
  selector: 'app-parents-inscripcion-camp',
  templateUrl: './parents-inscripcion-camp.component.html',
  styleUrls: ['./parents-inscripcion-camp.component.scss']
})
export class ParentsInscripcionCampComponent implements OnInit {
  products: any[]=[{camp:"Campamento de Verano",sede:"Los Potros",inicio:"2023-07-13 (1 mes, 1 semana)",termino:"2023-08-24",precio:25500,saldo:25000},
  {camp:"Campamento de Verano",sede:"Los Potros",inicio:"2023-07-13 (1 mes, 1 semana)",termino:"2023-08-24",precio:25500,saldo:25000}];

    product: any;
    textos:any={
      "esp":{
        "titulo":"Camps Anteriores",
        "titulo1":"Camps Proximo",
        "titulo3":"Campamentos Disponibles",
        "titulo4":"Sede",
        "titulo5":"Inicio",
        "titulo6":"Termino",
        "titulo7":"Precio",
        "titulo8":"ver campamento",
        "titulo9":"Campamentos Escolares Disponibles ",
        "titulo10":"Campamentos de verano  Disponible",
        "titulo11":"Campamentos a los que asistire",
        "titulo12":"Saldo",
        "titulo13":"Camps a los que asisti",
        "titulo14":"Campamentos Cancelados ",
        "titulo15":"ver perfil "



      },
      "eng":{
        "titulo":"PREVIOUS CAMPS",
        "titulo1":"FORTHCOMING CAMPS",
        "titulo3":"camps available",
        "titulo4":"Camp site",
        "titulo5":"Starts",
        "titulo6":"Ends",
        "titulo7":"Account balance",
        "titulo8":"see details",
        "titulo9":"School Camps Available",
        "titulo10":"Summer Camps Available",
        "titulo11":"Camps that I will attend",
        "titulo12":"Balance",
        "titulo13":"Camps I attended",
        "titulo14":"Canceled Camps",
        "titulo15":"view profile "

      }
    }
    multipleInscr=false;
    idoma = "esp";
    selectedProducts: any[];
    camper_band:any = [];
    submitted: boolean;
    selectedCustomers: any[];
    loading: boolean = false;
    customer:any =[];
    idCamps:any[]=[];
    summer_school_camps:any[] = [];
    subscribe_camps:any[] = [];
    cancelled_camps:any[] = [];
    passed_camps:any[] = [];
    id= 0;
    available_school_camps:any[]=[];
    campsSummer:any [];
    campsSchool:any [];
    inscripcion = true;
    typeSucribe = 0;
    inscribirUnoSolo =0;
    @ViewChild('centerDataModal') content:ElementRef;

    

    

  constructor(private camps: CampsService,private routesA:ActivatedRoute, private modalService:NgbModal, private info:CamperService,private lang:LangService, private routerNav:Router) {
    this.routesA.params.subscribe((params)=>{
      this.id = params['id']
    })
   }

  ngOnInit(): void {
    this.lang.getLang().subscribe((res:any)=>{
      this.idoma=res
      //console.log(this.idioma);
      
    })
    
    this.getCampsDIs();

  }

  prueba(){
    console.log( this.multipleInscr);

  }

 
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}





getCampsDIs(){
 
  this.info.getCapsT(this.id).subscribe((res:any)=>{
    console.log(res);
    this.camper_band = res.camper_band[0]
    this.camper_band.birthday =  this.calculateAge(this.camper_band.birthday)

    this.customer= res.available_school_camps;

    this.customer.map((item:any)=>{
      let fecha = item.camp_end
      fecha = fecha.split("T");
      item.camp_end = fecha[0];

      let fechaI = item.camp_start
      fechaI = fechaI.split("T");
      item.camp_start = fechaI[0];          
     });
    
    this.summer_school_camps= res.summer_school_camps;

    this.summer_school_camps.map((item:any)=>{
      let fecha = item.camp_end
      fecha = fecha.split("T");
      item.camp_end = fecha[0];

      let fechaI = item.camp_start
      fechaI = fechaI.split("T");
      item.camp_start = fechaI[0];          
     });


    this.subscribe_camps= res.subscribe_camps;

    this.subscribe_camps.map((item:any)=>{
      let fecha = item.camp_end
      fecha = fecha.split("T");
      item.camp_end = fecha[0];

      let fechaI = item.camp_start
      fechaI = fechaI.split("T");
      item.camp_start = fechaI[0];          
     });

    this.cancelled_camps= res.cancelled_camps;

     this.available_school_camps=res.available_school_camps;
     this.available_school_camps.map((item:any)=>{
      let fecha = item.camp_end
      fecha = fecha.split("T");
      item.camp_end = fecha[0];

      let fechaI = item.camp_start
      fechaI = fechaI.split("T");
      item.camp_start = fechaI[0];          
     });
    this.cancelled_camps.map((item:any)=>{
      let fecha = item.camp_end
      fecha = fecha.split("T");
      item.camp_end = fecha[0];

      let fechaI = item.camp_start
      fechaI = fechaI.split("T");
      item.camp_start = fechaI[0];          
     });

    this.passed_camps= res.passed_camps;
    this.passed_camps.map((item:any)=>{
      let fecha = item.camp_end
      fecha = fecha.split("T");
      item.camp_end = fecha[0];

      let fechaI = item.camp_start
      fechaI = fechaI.split("T");
      item.camp_start = fechaI[0];          
     });
    
  })
}

calculateAge(birthday: any) {
  console.log(birthday);

  var hoy = new Date();
  var cumpleanos = new Date(birthday);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }

  return edad;
}

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

centerModal(centerDataModal: any = this.content) {
  console.log(this.centerModal);
  
  this.modalService.open(centerDataModal, { centered: true });
}
closeModal(centerDataModal: any = this.content) {
 
  
  this.modalService.dismissAll(centerDataModal);
}
filterCampsSummer(){
  if(this.cancelled_camps.length<1&& this.subscribe_camps.length<1 && this.passed_camps.length <1 ){
   this.suscribeCamps(1)
  }else{
   // alert('actualiza los datos de tu hijo')
    this.inscripcion = false;
    this.typeSucribe = 1;

  }
}
inscribirCampsUnico(id){
  this.inscribirUnoSolo=id;
  if(this.cancelled_camps.length<1&& this.subscribe_camps.length<1 && this.passed_camps.length <1 ){
    this.suscribeCamps(4)
   }else{
    // alert('actualiza los datos de tu hijo')
     this.inscripcion = false;
     this.typeSucribe = 4;
 
   }

}
filterCamps(){
  if(this.cancelled_camps.length<1&& this.subscribe_camps.length<1 && this.passed_camps.length <1 ){
    this.suscribeCamps(2);
  }else{
   // alert('actualiza los datos de tu hijo')
    this.inscripcion = false;
    this.typeSucribe = 2;

  }
 


  
}
filterCampsScholl(){
  if(this.cancelled_camps.length<1&& this.subscribe_camps.length<1 && this.passed_camps.length <1 ){
    this.suscribeCamps(3);
  }else{
    //alert('actualiza los datos de tu hijo')
    this.inscripcion = false;
    this.typeSucribe = 3;

  }  
}


suscribeCamps(typeCamp:number){
  console.log(typeCamp,'sss');
  
  switch (typeCamp) {
    //campamento de verano
    case 1:
      let b = [];
      this.campsSummer.forEach((item)=>{
       b.push(item.camp_id)
    })
    this.centerModal();
    this.inscripcion = true;
    this.getCampsDIs();
      break;
    case 2:
      //campamentos disponibles
      let c = [];

      this.selectedCustomers.forEach((item)=>{
        c.push(item.camp_id)
       })

    this.getCampsDIs();
   this.inscripcion = true;
    this.centerModal();

    break;
    case 3:
      let d = [];
      //campamentos por escuela
      this.campsSchool.forEach((item)=>{
        d.push(item.camp_id)

    })
    this.getCampsDIs();
    this.inscripcion = true;
    this.centerModal();

    break;
    case 4:
      //campamentos disponibles  
        let a = [this.inscribirUnoSolo]       
        this.camps.setCamps(a,this.id).subscribe((res:any)=>{
          console.log(res.camper_in_camp);    
          this.centerModal();
          setTimeout(() => {       
            this.closeModal();
            //this.routerNav.navigate(['dashboard/parents/camp-info/'+res.camper_in_camp.camper_id+'/'+res.camper_in_camp.camp_id]);

          }, 1000);
          
          
         },
         (error)=>{
           console.log(error)
         })
  

    this.getCampsDIs();
   this.inscripcion = true;
   

    break;
  
    default:
      this.inscripcion = true;
     // this.centerModal();

      break;
  }
  this.getCampsDIs();

}

}
