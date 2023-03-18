import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';


@Component({
  selector: 'app-tabla-campers-escuelas',
  templateUrl: './tabla-campers-escuelas.component.html',
  styleUrls: ['./tabla-campers-escuelas.component.scss']
})
export class TablaCampersEscuelasComponent implements OnInit {

    selectedCustomers: any[];

    representatives: any[];

    statuses: any[];

    loading: boolean = false;

    activityValues: number[] = [0, 100];

  constructor() { }
  cars=[{Nombre:"Campamento con agrupaciones",grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 " },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "   },
  {Nombre:"Campamento con agrupaciones", grado:"prueba2",inicio:"2020-11-10 ",termina:"2020-11-10 "},    
    ]

    customer=[{name: "Prueba de Nombre subiendo ",record:{n:2,b:2,d:3},precio:5500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}
    ,{name: "Arueba de Nombre",record:{n:12,b:2,d:3},precio:2500,sede:"Los Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"},
    {name: "Lrueba de Nombre",record:{n:12,b:2,d:3},precio:5500,sede:"aLos Potros",inicio:"2023-11-28 (3 días)",termina:"2023-11-28"}]
   customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
}

  ngOnInit(): void {
  }
  

}
