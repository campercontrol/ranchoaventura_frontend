import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { CampsService } from 'src/services/camps.service';


@Component({
  selector: 'app-parents-inscripcion-camp',
  templateUrl: './parents-inscripcion-camp.component.html',
  styleUrls: ['./parents-inscripcion-camp.component.scss']
})
export class ParentsInscripcionCampComponent implements OnInit {
  products: any[]=[{camp:"Campamento de Verano",sede:"Los Potros",inicio:"2023-07-13 (1 mes, 1 semana)",termino:"2023-08-24",precio:25500,saldo:25000},
  {camp:"Campamento de Verano",sede:"Los Potros",inicio:"2023-07-13 (1 mes, 1 semana)",termino:"2023-08-24",precio:25500,saldo:25000}];

    product: any;

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
    @ViewChild('centerDataModal') content:ElementRef;

    

    

  constructor(private camps: CampsService,private routesA:ActivatedRoute, private modalService:NgbModal, private info:CamperService) {
    this.routesA.params.subscribe((params)=>{
      this.id = params['id']
    })
   }

  ngOnInit(): void {
    this.getCampsDIs();

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




setCamp(a){

  this.camps.setCamps(a).subscribe((res:any)=>{
    console.log(res);    
    console.log(res.status);    

   },
   (error)=>{
     console.log(error)
   }
   )
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
filterCampsSummer(){
  if(this.cancelled_camps.length<1&& this.subscribe_camps.length<1 && this.passed_camps.length <1 ){
   this.suscribeCamps(1)
  }else{
   // alert('actualiza los datos de tu hijo')
    this.inscripcion = false;
    this.typeSucribe = 1;

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
  switch (typeCamp) {
    //campamento de verano
    case 1:
      this.campsSummer.forEach((item)=>{
        let a = {
          status: 36,
          payment_balance: 0,
          camp_id: item.camp_id,
          camper_id: this.id,
  
        }
        console.log(a)
        this.setCamp(a)
    })
    this.centerModal();
    this.inscripcion = true;
    this.getCampsDIs();
      break;
    case 2:
      //campamentos disponibles
      this.selectedCustomers.forEach((item)=>{
        let a = {
          status: 36,
          payment_balance: 0,
          camp_id: item.camp_id,
          camper_id: this.id,
  
        }
        console.log(a)
        this.setCamp(a)
    })

    this.getCampsDIs();
  this.inscripcion = true;
    this.centerModal();

    break;
    case 3:
      //campamentos por escuela
      this.campsSchool.forEach((item)=>{
        let a = {
          status: 36,
          payment_balance: 0,
          camp_id: item.camp_id,
          camper_id: this.id,
  
        }
        console.log(a)
        this.setCamp(a)
    })
    this.getCampsDIs();
    this.inscripcion = true;
    this.centerModal();

    break;
  
    default:
      this.inscripcion = true;
     // this.centerModal();

      break;
  }
}

}
