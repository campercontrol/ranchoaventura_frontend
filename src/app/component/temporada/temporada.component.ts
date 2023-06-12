import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.scss']
})
export class TemporadaComponent implements OnInit {
  capacitaciones:any =[];
  selectCapcitacion:any;
  items:any;
  display: boolean = false;
  text:any;
  capa= {
    name :''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  showDialog() {
    this.display = true;
}

}
