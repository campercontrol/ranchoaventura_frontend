import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {
  activeIndex1: number = 0;

  activeIndex2: number = 0;
  activeIndex: number = 0;
	public isCollapsed = true;

  alumnos= [{id:1,acampador:"alan camper"},{id:2,acampador:"prueba de camper"},{id:3,acampador:"prueba de camper3"},{id:4,acampador:"prueba de camper4"},{id:5,acampador:"prueba de camper5"}]
  id:any="";
  selectedCustomers: any[];
  
  loading: boolean = false;
  tabla:any=[{fecha:"2023-01-11",descripcion:"Abonar saldo1",entrada:0,sale:"",saldo:"4200"},
  {fecha:"2023-01-10",descripcion:"Abonar saldo2",entrada:320,sale:"",saldo:"4100"},
  {fecha:"2023-01-22",descripcion:"Abonar saldo3",entrada:390,sale:"200",saldo:"4100"}]

  tiposPago=[{id:1,desc:"cheque"},{id:2,desc:"Deposito bancario"},{id:3,desc:"Efectivo"},{id:4,desc:"Paypal"},{id:5,desc:"Transferencia Bancaria"}]
  metodoPago:any=0;
  monto:number=0;
  tipMovimiento:any=0;
  numeroTrans:number=0;
  fecha:string=""

  constructor() { }

  ngOnInit(): void {
  }

}
