import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChekpointService } from 'src/services/chekpoint.service';

@Component({
  selector: 'app-lista-puntos-control',
  templateUrl: './lista-puntos-control.component.html',
  styleUrls: ['./lista-puntos-control.component.scss']
})
export class ListaPuntosControlComponent implements OnInit {
  selectedProducts: any[];

  product: any;

  ids:any = [];
  listaChcek: any=[];
  camps:any=[]
  submitted: boolean;
  selectedCustomers: any[];
  loading: boolean = false;
  customer:any =[];
  idCamps:any[]=[];
  id= 0;
  prospectosArray:any=[]
  constructor(private checkPoint : ChekpointService, private router:Router) {

    checkPoint.getListaCheckpoint().subscribe((res:any)=>{
      console.log(res.data);
      this.listaChcek= res.data; 
    })
    console.log(this.listaChcek);
    
   }

  ngOnInit(): void {
  }

   eliminarValoresRepetidos<T>(arreglo: T[]): T[] {
    const arregloSinRepetidos: T[] = [];
  
    for (const valor of arreglo) {
      if (!arregloSinRepetidos.includes(valor)) {
        arregloSinRepetidos.push(valor);
      }
    }
  
    return arregloSinRepetidos;
  }



  redirecionar(id){
    this.router.navigate(['/staff/checkpoint/'+id])

  }
}
