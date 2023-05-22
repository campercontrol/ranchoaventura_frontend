import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamperService } from 'src/services/camper.service';

@Component({
  selector: 'app-campamento',
  templateUrl: './campamento.component.html',
  styleUrls: ['./campamento.component.scss']
})
export class CampamentoComponent implements OnInit {

  idCamper=0;
  idCamp=0;
  dataCamp;
  dataPagos:any={};
  nameCamp:any={};


  constructor(private hijos:CamperService,private routesA:ActivatedRoute) { 
    this.routesA.params.subscribe((params)=>{
      this.idCamp = params['camp'];
    //  console.log(this.idCamp);
      
    })
    this.routesA.params.subscribe((params)=>{
      this.idCamper = params['camper'];
      //console.log(this.idCamper);

    })
    this.hijos.informacionCampamento(Number(this.idCamper),Number(this.idCamp)).subscribe((res:any)=>{
        this.dataCamp = res.camp;
        this.dataPagos = res.payments;
        console.log(this.dataCamp);
        
      
    })
  }

  ngOnInit(): void {
  }

}
