import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from 'src/services/staff.service';

@Component({
  selector: 'app-lista-prospectos',
  templateUrl: './lista-prospectos.component.html',
  styleUrls: ['./lista-prospectos.component.scss']
})
export class ListaProspectosComponent implements OnInit {
  selectedProducts: any[];

  product: any;


  submitted: boolean;
  selectedCustomers: any[];
  loading: boolean = false;
  customer:any =[];
  idCamps:any[]=[];
  id= 0;
  cargando:boolean=false;
  prospectosArray:any=[]
  constructor(private prospectos: StaffService,private modalService: NgbModal, private router:Router) {

   }

  ngOnInit(): void {
    this.cargando=false;

    this.getProspecto();
  }




  filterCamps(){
    this.selectedCustomers.forEach((item)=>{
       
        this.setCamp(item.id);
    }) ;
    this.cargando=true;
   this.modalService.dismissAll();  
  }
  
  
  setCamp(a){

    this.prospectos.aceptarProspectos(a).subscribe((res:any)=>{
      this.getProspecto(); 
    })
  }

  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	
	}

  infostaff(id){
    this.router.navigate(['dashboard/staff/perfil/'+id]);

  }

  getProspecto(){
    let a:any = []
    this.prospectos.getProspectos().subscribe((res:any)=>{
      console.log(res);
      
      this.prospectosArray = res.data;
      this.prospectosArray.forEach((item:any)=>{
            item.Staff.email = item.email;
            item.Staff.season_name=item.season_name;
            a.push(item.Staff)
      })

      this.prospectosArray = a;

      //console.log(this.prospectosArray);
      
    });
    this.cargando=false;

  }
}
