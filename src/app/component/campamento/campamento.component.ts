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
  dataCamp:any={};
  dataPagos:any={};
  nameCamp:any={};
  cargosExtras:any ;
  PreguntasExtras:any ;
  respuestPregunta:any="";
  cargosExtra:false;
  estatusPago:Boolean= false;
  pagos:boolean=false;



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
      let a :any=res.camp
        this.dataCamp = a;
        this.dataPagos = res.payments;
        this.dataPagos.length()>0? this.pagos =true:this.pagos=false;   
    })
    this.camps.getPreguntas(Number(this.idCamp)).subscribe((res:any)=>{
      console.log(res,'preguntas');
      this.PreguntasExtras = res.data
      
    })
    this.camps.getCargosExtras(Number(this.idCamp)).subscribe((res:any)=>{
      console.log(res,'cargos extras');
      this.cargosExtras = res.data
      
    })
  }

  ngOnInit(): void {
  }


  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
		
	}
  saveRes(){
    this.PreguntasExtras[0];
    let res = {
      question_id:this.PreguntasExtras[0].id,
      answer:this.respuestPregunta,
      camper_id:this.idCamper,

    }
    this.camps.setPreguntas(this.PreguntasExtras[0].id,res).subscribe((res:any)=>{
      console.log(res);
      this.modalService.dismissAll()
      
    })

  }
  saveChange(){
   
    let res = {
    

      "is_selected": this.estatusPago,
      "camper_id": this.idCamp,
      "extra_charge_id": this.cargosExtras.id,

    }
    this.camps.setPagos(res).subscribe((res:any)=>{
      console.log(res);
      this.modalService.dismissAll()
      
    })

  }

}
