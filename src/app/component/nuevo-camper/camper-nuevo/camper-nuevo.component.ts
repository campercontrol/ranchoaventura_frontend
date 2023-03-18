import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-camper-nuevo',
  templateUrl: './camper-nuevo.component.html',
  styleUrls: ['./camper-nuevo.component.scss']
})
export class CamperNuevoComponent implements OnInit {
  visibleBarOptions: Options = {
    floor: 0,
    ceil: 180,
    showSelectionBar: true
  };
  visibleSelection=0;


  sexo:string[]=['Hombre','Mujer',"No binario"," Prefiero no decir"]

  constructor() { }

  ngOnInit(): void {
  }

  

}
