import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss']
})
export class CreateTrainingComponent implements OnInit {
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


 public Editor = ClassicEditor;

    
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];

  }

  showDialog() {
    this.display = true;
}
}
