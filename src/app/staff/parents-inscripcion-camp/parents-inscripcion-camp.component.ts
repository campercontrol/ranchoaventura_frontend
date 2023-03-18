import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parents-inscripcion-camp',
  templateUrl: './parents-inscripcion-camp.component.html',
  styleUrls: ['./parents-inscripcion-camp.component.scss']
})
export class ParentsInscripcionCampComponent implements OnInit {
  products: any[]=[{camp:"Campamento de Verano",sede:"Los Potros",inicio:"2023-07-13 (1 mes, 1 semana)",termino:"2023-08-24",precio:25500,saldo:25000},
  {camp:"Campamento de Verano",sede:"Los Potros",inicio:"2023-07-13 (1 mes, 1 semana)",termino:"2023-08-24",precio:25500,saldo:25000}];

    product: any;

    selectedProducts: any[];

    submitted: boolean;


  constructor() { }

  ngOnInit(): void {
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}



  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

}
