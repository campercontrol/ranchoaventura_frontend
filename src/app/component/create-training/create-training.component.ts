import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CamperService } from 'src/services/camper.service';


@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss']
})
export class CreateTrainingComponent implements OnInit {
  capacitaciones: any = [];
  selectCapcitacion: any;
  items: any;
  display: boolean = false;
  text: any;
  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  
  date :Date =new Date()

  public addTrainingForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    photo: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.min(0)]],
    url: [0, [Validators.required, Validators.min(0)]],
    active: [true, [Validators.required]],
    created_at: [this.date]
  })


  subiendo(event: any) {
    const archivo = event.target.files[0];
    const formulario = new FormData();
    formulario.append('file', archivo)
    this.catalogos.setPhoto(formulario).subscribe((res: any) => {
      console.log(res.path);
      this.addTrainingForm.patchValue({
        photo: res.path
      })
    })
  }

  onSave () : void {
    console.log(this.addTrainingForm.value)
    this.catalogos.postTraining(this.addTrainingForm.value).subscribe((res) => {console.log(res)});
  }


  public Editor = ClassicEditor;


  constructor(private fb: FormBuilder, private catalogos: CamperService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];

  }

  showDialog() {
    this.display = true;
  }
}
