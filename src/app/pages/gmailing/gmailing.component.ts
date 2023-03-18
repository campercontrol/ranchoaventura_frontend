import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-gmailing',
  templateUrl: './gmailing.component.html',
  styleUrls: ['./gmailing.component.scss']
})
export class GmailingComponent implements OnInit {


  public Editor = ClassicEditor;
  term:any
  transactions:any=[];
  Titulo: string = "Enviados"
  tipoTemplate:number;
  template:string;
  destinatario : number;
  capacitacion:any;
  campamento:any;
  publico=[{value:"1",publico:"Campers"},{value:"2",publico:"Staff"},{value:"3",publico:"Escuelas"}]
  publicoSelecionado:any;

  constructor() { }

  ngOnInit(): void {
    this.transactions = [
      {
        id: '#SK2540',
        name: 'Campamento numero 4',
       
      },
      {
        id: '#SK2541',
        name: 'Jamal Burnett',
        
      },
      {
        id: '#SK2542',
        name: 'Prueba de campamento',
        
      },
      {
        id: '#SK2543',
        name: 'Campamento numero 2',
        
      },
      {
        id: '#SK2544',
        name: 'Campamento cancelado'
      },
      {
        id: '#SK2545',
        name: 'Mensaje para padres',
       
      },
    ];

 
  
  }
   prueba(){
    console.log(this.template);
    
  }

}
