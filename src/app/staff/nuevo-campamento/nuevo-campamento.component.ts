import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-nuevo-campamento',
  templateUrl: './nuevo-campamento.component.html',
  styleUrls: ['./nuevo-campamento.component.scss']
})
export class NuevoCampamentoComponent implements OnInit {

  constructor() { }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];


 public Editor = ClassicEditor;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];

  }

}
