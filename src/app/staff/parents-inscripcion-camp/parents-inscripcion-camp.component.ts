import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

    submitted: boolean;
    selectedCustomers: any[];
    loading: boolean = false;
    customer:any =[];
    idCamps:any[]=[];
    id= 0;
    @ViewChild('centerDataModal') content:ElementRef;

    

    sedes = [{
      "name": "Ex hacienda de Chautla",
      "uid": "53d6e7c5-c379-4ddd-96ff-7f96f96b22de",
      "email": "string",
      "contact": "string",
      "url": "string",
      "updated_at": "2023-04-21T04:07:29.508989+00:00",
      "phone": "string",
      "id": 1,
      "address": "string",
      "active": true,
      "created_at": "2023-04-19T21:17:13.053402+00:00"
    },
    {
      "name": "Alpinia",
      "uid": "e2cd398c-7ad6-4292-b1f9-23114345487f",
      "email": "string",
      "contact": "string",
      "url": "string",
      "updated_at": "2023-04-21T04:07:41.341131+00:00",
      "phone": "string",
      "id": 2,
      "address": "string",
      "active": true,
      "created_at": "2023-04-19T21:17:13.053402+00:00"
    },
    {
      "name": "Talo",
      "uid": "9d14ff42-bb34-4227-a83b-993892edd9a8",
      "email": "string",
      "contact": "string",
      "url": "string",
      "updated_at": "2023-04-21T04:07:48.846039+00:00",
      "phone": "string",
      "id": 3,
      "address": "string",
      "active": true,
      "created_at": "2023-04-19T21:17:13.053402+00:00"
    }]

  constructor(private camps: CampsService,private routesA:ActivatedRoute, private modalService:NgbModal) {
    this.routesA.params.subscribe((params)=>{
      this.id = params['id']
    })
   }

  ngOnInit(): void {
    this.camps.getCampsDisponibles(this.id).subscribe(
      (res:any)=>{
        
       this.customer = res.data;
       console.log(this.customer);
       

       this.customer.map((item:any)=>{
        let fecha = item.camp_end
        fecha = fecha.split("T");
        item.camp_end = fecha[0];

        let fechaI = item.camp_start
        fechaI = fechaI.split("T");
        item.camp_start = fechaI[0];
          
            
       })
        
      }
    )

  }

  searchSedes(id){
    let a = ""
      this.sedes.map((item:any)=>{
        id == item.id
         a = item.name
      })
      return a
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

filterCamps(){
 
  this.selectedCustomers.forEach((item)=>{
      let a = {
        id: 0,
        status: 36,
        payment_balance: 0,
        camp_id: item.camp_id,
        camper_id: this.id,

      }
      console.log(a)
      this.setCamp(a)
  })
  this.centerModal()


  
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

}
