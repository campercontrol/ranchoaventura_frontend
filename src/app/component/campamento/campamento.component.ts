import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { CampsService } from 'src/services/camps.service';

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
  cargosExtras:any ;


  constructor(private hijos:CamperService,private camps:CampsService,private routesA:ActivatedRoute,private modalService: NgbModal) { 
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
    this.camps.getPreguntas(Number(this.idCamp)).subscribe((res:any)=>{
      console.log(res,'preguntas');
      
    })
    this.camps.getCargosExtras(Number(this.idCamp)).subscribe((res:any)=>{
      console.log(res,'cargos extras');
      this.cargosExtras = res.data[0]
      
    })
  }

  ngOnInit(): void {
  }


  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', centered: true });
  }

}
