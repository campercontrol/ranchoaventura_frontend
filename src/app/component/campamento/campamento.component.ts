import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
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
  statusInscri:boolean=false;
  location= "";



  constructor(private hijos:CamperService,private camps:CampsService,private routesA:ActivatedRoute,private modalService: NgbModal, private router:Router) { 
    this.routesA.params.subscribe((params)=>{
      this.idCamp = params['camp'];
    //  console.log(this.idCamp);
      
    })
    this.routesA.params.subscribe((params)=>{
      this.idCamper = params['camper'];
      //console.log(this.idCamper);

    })
    this.hijos.informacionCampamento(Number(this.idCamper),Number(this.idCamp)).subscribe((res:any)=>{
      //console.log(res);
      console.log(res);
        let a :any=res.camp
        console.log(res.camper_subscribe,'aasas');
        this.location = res.location
        
        this.statusInscri = res.camper_subscribe;
        this.dataCamp = a;
        this.dataPagos = res.payments;
        console.log(this.dataCamp,'aa');
        
        this.dataCamp.length> 0 ? this.pagos =true:this.pagos=false;   

    //   console.log(this.dataPagos,'aqui la info');
        
       
      },error=>{
        alert('no se pudo cargar')
      })



    this.camps.getPreguntas(Number(this.idCamp),).subscribe((res:any)=>{
     console.log(res,'preguntas');
      this.PreguntasExtras = res.data;
     
      
    })
    this.camps.getCargosExtras(this.idCamp,Number(this.idCamper)).subscribe((res:any)=>{
    console.log(res,'cargos extras');
      this.cargosExtras = res.data
      console.log(this.cargosExtras,'cargos extras');

      
    })
  }

  ngOnInit(): void {
  }


  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
		
	}
  getcamps(){
    this.camps.getCamp(this.idCamp).subscribe((res:any)=>{
    //  console.log(res.data);
      this.dataCamp = res.data;
      
  //   console.log(this.dataPagos,'aqui la info');
      
      this.dataPagos.length> 0 ? this.pagos =true:this.pagos=false;   
      
    })

  }
  incio(){
    this.router.navigate(['parents/registered-children'])
  }
  perfil(){
    this.router.navigate(['/parents/camper/'+this.idCamper])
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
    this.cargosExtras.forEach(element => {
           let res = {
    
            "is_selected": element.extra_selected,
            "camper_id":  this.idCamp,
            "extra_charge_id": element.extra_charge_id, 

    }
    this.camps.setPagos(res).subscribe((res:any)=>{
      console.log(res);
      this.modalService.dismissAll()
      
    })
    });
   

  }
  deletCamp(){
    this.camps.deletCamp(this.idCamper,this.idCamp).subscribe((res:any)=>{
      console.log(res);
      alert ('se cancelo la inscripcion correctamente')
    },error=>{
      console.log(error);
      
    })
  }

}
