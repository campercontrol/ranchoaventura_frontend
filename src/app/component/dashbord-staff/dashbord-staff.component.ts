import { Component, OnInit } from '@angular/core';
import { CampsService } from 'src/services/camps.service';
import { StaffService } from 'src/services/staff.service';

@Component({
  selector: 'app-dashbord-staff',
  templateUrl: './dashbord-staff.component.html',
  styleUrls: ['./dashbord-staff.component.scss']
})
export class DashbordStaffComponent implements OnInit {
  selectedProducts: any[];

  product: any;

  spiner= false;
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

  constructor(private camps: CampsService, private staff:StaffService) {
    this.getCamps();
   }

  ngOnInit(): void {
  }

  getCamps(){
    this.spiner=true
    this.camps.getDashbord(23).subscribe((res:any)=>{
      console.log(res.data);
      this.aCamp =res.data.next_camps;
      this.pCamp = res.data.available_camps;
      this.ICamp =  res.data.staff_camps;       
      this.spiner= false;
    })
  }

  cancelar(id){
      this.staff.cancelarParticipacio(id).subscribe((res)=>{
        this.getCamps();

      },erro=>{
        console.log(erro);
        
      })
  }
  inscribirCamp(a){
    let idCamp = a;
    let b ={
      camp_id: idCamp,
      staff_id:23

    }
    this.camps.inscribirCappStaff(b).subscribe((res:any)=>{
          console.log(res);
          this.getCamps();
          
    })
  }

}
