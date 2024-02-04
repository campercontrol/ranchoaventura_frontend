import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CamperService } from 'src/services/camper.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
  temporada=[];
  eventos=[];
  capacitaciones=[];

  constructor(private fb: FormBuilder, private catalogos: CamperService) { 
    this.getTrainig()
  }

  ngOnInit(): void {
  }
  getTrainig(){
    this.catalogos.getTemporadas().subscribe((res:any)=>{
      this.temporada = res.data;
      console.log(this.eventos);  
    })
    this.catalogos.getTraining().subscribe((res:any)=>{
      this.capacitaciones = res.data;
      console.log(this.capacitaciones);  
    })
    this.catalogos.getEventos().subscribe((res:any)=>{
      this.eventos = res.data;
      
      console.log(this.eventos);  
    })
    
  }

}
