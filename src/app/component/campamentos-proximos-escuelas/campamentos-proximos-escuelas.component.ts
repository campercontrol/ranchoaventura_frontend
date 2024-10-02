import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AdmiService } from 'src/services/admi.service';

@Component({
  selector: 'app-campamentos-proximos-escuelas',
  templateUrl: './campamentos-proximos-escuelas.component.html',
  styleUrls: ['./campamentos-proximos-escuelas.component.scss']
})
export class CampamentosProximosEscuelasComponent implements OnInit {

  constructor(private service:AdmiService,private info : AuthenticationService) { }
  listCamps:any;
  spiner:boolean = false;
  ngOnInit(): void {
    this.spiner = true;
    const data :any= this.info.infToken;
      
    this.service.gaetCampsSchoolProx(data.profile_id).subscribe((res:any)=>{
      this.listCamps= res.data;
      this.spiner = false;


    })
      
  }

}
