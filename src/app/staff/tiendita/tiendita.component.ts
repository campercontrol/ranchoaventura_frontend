import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiendita',
  templateUrl: './tiendita.component.html',
  styleUrls: ['./tiendita.component.scss']
})
export class TienditaComponent implements OnInit {
  activeIndex1: number = 0;

  activeIndex2: number = 0;
  activeIndex: number = 0;
	public isCollapsed = true;

  alumnos= [{id:1,acampador:"alan camper"},{id:2,acampador:"prueba de camper"},{id:3,acampador:"prueba de camper3"},{id:4,acampador:"prueba de camper4"},{id:5,acampador:"prueba de camper5"}]
  id:any="";
  selectedCustomers: any[];
  
  loading: boolean = false;

  simulacionRes=[{id:1,datos:[{fecha:"2023-01-11",descripcion:"Abonar saldo",entrada:350,sale:"",saldo:"4200"},
                              {fecha:"2023-01-10",descripcion:"Abonar saldo",entrada:320,sale:"",saldo:"4100"},
                              {fecha:"2023-01-22",descripcion:"Abonar saldo",entrada:390,sale:"200",saldo:"4100"}]},
                 {id:2,datos:[{fecha:"2023-01-11",descripcion:"Abonar saldo1",entrada:0,sale:"",saldo:"4200"},
                              {fecha:"2023-01-10",descripcion:"Abonar saldo2",entrada:320,sale:"",saldo:"4100"},
                              {fecha:"2023-01-22",descripcion:"Abonar saldo3",entrada:390,sale:"200",saldo:"4100"}]},
                 {id:3,datos:[{fecha:"2023-01-11",descripcion:"Abonar saldo1",entrada:0,sale:"",saldo:"4200"},
                              {fecha:"2023-01-10",descripcion:"Abonar saldo2",entrada:320,sale:"",saldo:"4100"},
                              {fecha:"2023-01-22",descripcion:"Abonar saldo3",entrada:390,sale:"200",saldo:"4100"}]}]

  tabla:any=[]

  scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));

  constructor() { }

  ngOnInit(): void {
  }

  buscarCamp(){
    this.simulacionRes.forEach((e:any)=>{
      if(e.id == this.id){
        this.tabla=e.datos

      }
    })
  }
}
