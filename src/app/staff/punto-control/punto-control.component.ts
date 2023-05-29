import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampsService } from 'src/services/camps.service';
import { ChekpointService } from 'src/services/chekpoint.service';

@Component({
  selector: 'app-punto-control',
  templateUrl: './punto-control.component.html',
  styleUrls: ['./punto-control.component.scss']
})
export class PuntoControlComponent implements OnInit {
  selectedCustomers: any[];

  representatives: any[];
  columnas = [];
  mes ={'01':'Enero','02':'Febrero','03':'Marzo','04':'Abril','05':'Mayo','06':'Junio','07':'Julio','08':'Agosto','09':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre'}

  statuses: any[];
  chekpoint: FormGroup;
  letrero:boolean= false;
  updateName="";
  updateDate="";
  updateId=0;

  loading: boolean = false;
  displayMaximizable: boolean;
    puntosControl:any=[{name:"id"},{name:'nombre'},{name:"prueba",fecha:"31 de octubre 2024",inscritos:0 ,cupos:3}]



  activityValues: number[] = [0, 100];
  items = []
  id: any;
  fecha:any;
  visible: boolean;
  estatusUpdate = false
  infoCamp: any ={};

   

  constructor(private check: ChekpointService, private FormGroup: FormBuilder,private routesA : ActivatedRoute,private camps:CampsService ) { 
    this.routesA.params.subscribe((params)=>{
      this.id = params['id']
    })
    const currentDate = new Date();

    this.camps.getCamp(this.id).subscribe((res:any)=>{
      this.infoCamp = res.data
    })
 
  }
  cars = [{ Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  ]
  customer = [{id:2, name: "Alberto Ulises Hernandez Cruz", record: { n: 2, b: 2, d: 3 }, precio: 5500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }
    , {id:3, name: "Arueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 2500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: false },
  {id:4, name: "Lrueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 5500, sede: "aLos Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }]


  ngOnInit(): void {
    this.chekpoint = this.FormGroup.group({
      name : ["",Validators.required],
      chekpoint_date:["",Validators.required],
      order: [0],
      camp_id:[0,],
    })

    this.chekpoint.patchValue({
      camp_id : this.id
    })
    this.check.getCheckPonitTable(Number(this.id)).subscribe((res:any)=>{
       // console.log(res);
        this.columnas = res.data;
        this.columnas.map((item:any)=>{
 
          let a:string =item.chekpoint_date.slice(5,7)
          
          console.log(a);
          item.chekpoint_date_esp =  item.chekpoint_date.slice(8,10) + ' de ' +this.mes[a]+ ' del ' + item.chekpoint_date.slice(0,4) 
       //  console.log(this.mes[a.]);
          
        });
        console.log(this.columnas);
        
        
    });

  }
  crearCheck(){   
    this.check.postchekpoint(this.chekpoint.value).subscribe(
      (res:any)=>{
            this.chekpoint.reset()
            this.letrero = true
            this.chekpoint.patchValue({
              camp_id : this.id
            })  ;
            setTimeout(() => {
              this.letrero= false;
            }, 1000);   
      });
  }
  showDialog(item) {
    this.visible = true;
    console.log(item);
    this.updateName = item.name;
    this.updateDate =item.chekpoint_date;
    this.updateId= item.id;
  }

  updadte(){
    this.estatusUpdate = true;

    let a = {
      "name": this.updateName,
      "chekpoint_date": this.updateDate,
      "order": 0,
      "camp_id": this.id,
    }
      this.check.updatecheckPoint(this.updateId,a).subscribe((res:any)=>{
        this.getColumnas()
        setTimeout(() => {
          this.estatusUpdate = false
          this.cerrarModal()

        }, 1000);
      })
  }

  cerrarModal(){
    this.visible = false;
  }
  getColumnas(){
    this.check.getCheckPonitTable(Number(this.id)).subscribe((res:any)=>{
      // console.log(res);
       this.columnas = res.data;
       this.columnas.map((item:any)=>{

         let a:string =item.chekpoint_date.slice(5,7)
         
         console.log(a);
         item.chekpoint_date_esp =  item.chekpoint_date.slice(8,10) + ' de ' +this.mes[a]+ ' del ' + item.chekpoint_date.slice(0,4) 
      //  console.log(this.mes[a.]);
         
       });
       console.log(this.columnas);
       
       
   });
  }

}
