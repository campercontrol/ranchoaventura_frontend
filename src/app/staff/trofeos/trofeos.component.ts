import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-trofeos',
  templateUrl: './trofeos.component.html',
  styleUrls: ['./trofeos.component.scss']
})
export class TrofeosComponent implements OnInit {
  selectedCustomers: any[];
  representatives: any[];
  modalVista :boolean= true;
  modalEditar :boolean= true;

  statuses: any[];
  loading: boolean = false;

  activityValues: number[] = [0, 100];
  items = []

  cars = [{ Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  ]
  customer = [{ name: "Alberto Ulises Hernandez Cruz", record: { correo: "demo@campercontrol.com", tel: "5556576877", cel: "564545545676" }, precio: 5500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }
    , { name: "Arueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 2500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: false },
  { name: "Lrueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 5500, sede: "aLos Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }]

  trofeos = [{ name: "Alberto Ulises Hernandez Cruz", record: { correo: "demo@campercontrol.com", tel: "5556576877", cel: "564545545676" }, fecha: "16 de Junio de 1995	" }
  , { name: "Arueba de Nombre", record: { correo: "demo@campercontrol.com", tel: "5556576877", cel: "564545545676" }, fecha: "16 de Junio de 1995	" },
{ name: "Lrueba de Nombre",  record: { correo: "demo@campercontrol.com", tel: "5556576877", cel: "564545545676" }, fecha: "16 de Junio de 1995	"}]


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  status(){
    this.modalVista= !this.modalVista
 }
 openModal(content: any) {
  this.modalService.open(content);
}

/**
 * Open extra large modal
 * @param exlargeModal extra large modal data
 */
extraLarge(exlargeModal: any) {
  this.modalService.open(exlargeModal, { size: 'xl', centered: true });
}
}
