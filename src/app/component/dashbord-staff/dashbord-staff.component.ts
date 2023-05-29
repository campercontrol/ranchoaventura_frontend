import { Component, OnInit } from '@angular/core';
import { CampsService } from 'src/services/camps.service';

@Component({
  selector: 'app-dashbord-staff',
  templateUrl: './dashbord-staff.component.html',
  styleUrls: ['./dashbord-staff.component.scss']
})
export class DashbordStaffComponent implements OnInit {
  selectedProducts: any[];

  product: any;


  submitted: boolean;
  selectedCustomers: any[];
  loading: boolean = false;
  customer:any =[];
  idCamps:any[]=[];
  id= 0;
  prospectosArray:any=[];
  pCamp:any = [];// inscripcion cap
  aCamp:any = [];// apuntado a camps
  ICamp:any = []; // confirmacion de camps

  constructor(private camps: CampsService) {
    this.getCamps();
   }

  ngOnInit(): void {
  }

  getCamps(){
    this.camps.getDashbord().subscribe((res:any)=>{
      console.log(res.data);
      this.aCamp =res.data.next_camps;
      this.pCamp = res.data.available_camps;
      this.ICamp =  res.data.staff_camps; 


      
    })

  }

}
