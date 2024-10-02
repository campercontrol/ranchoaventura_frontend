import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AdmiService } from 'src/services/admi.service';
@Component({
  selector: 'app-campamentos-anteriores-escuelas',
  templateUrl: './campamentos-anteriores-escuelas.component.html',
  styleUrls: ['./campamentos-anteriores-escuelas.component.scss']
})
export class CampamentosAnterioresEscuelasComponent implements OnInit {

  constructor(private service:AdmiService,private info : AuthenticationService) { }
  listCamps:any;
  spiner:boolean = false;
  ngOnInit(): void {
    this.spiner = true;
    const data :any= this.info.infToken;
    this.service.gaetCampsSchoolAnteriores(data.profile_id).subscribe((res:any)=>{
      this.listCamps= res.data;
      this.spiner = false;


    })
      
  }

}
