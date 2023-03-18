import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from "primeng/api";
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-perfil-camper',
  templateUrl: './perfil-camper.component.html',
  styleUrls: ['./perfil-camper.component.scss']
})
export class PerfilCamperComponent implements OnInit {
  
  events2: any[];
  events1: any[];
  providers: [];
  isCollapsed = true;

  constructor( private primengConfig: PrimeNGConfig ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.events1 = [
      {
        status: "Campamento con comentario del admin",
        date: " 28/Nov/2023 - 30/Nov/2023",
      
      },
      {
        status: "Evento con preguntas extras ",
        date: "21/Nov/2023 - 22/Nov/2023 (2 días)",
        icon: PrimeIcons.COG,
        color: "#673AB7"
      },
      {
        status: "Campamento con cargos extras y puntos de control prueba de campamenot grande",
        date: " 10/Nov/2023 - 12/Nov/2023 (3 días)",
        costo:"20000",
        icon: PrimeIcons.ENVELOPE,
        color: "#FF9800"
      },
      {
        status: "Campamento de Verano",
        date: " 13/Jul/2023 - 24/Ago/2023 (1 mes, 1 semana)",
        icon: PrimeIcons.CHECK,
        color: "#607D8B"
      }
    ];

    this.events2 = ["2020", "2021", "2022", "2023"];
  }
  

}
