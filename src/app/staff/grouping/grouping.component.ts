import { Component, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';



@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.scss']
})
export class GroupingComponent  {
  datos= [{agrupación:"Camping",tipo:"Autobús", editar:'<a class=" btn btn-success">Editar</a>'}, {agrupación:"Camping2",tipo:"Autobús", editar:'<a class=" btn btn-success">Editar</a>'}]
  rows = [];
  temp = [];
  
  breadCrumbItems: Array<{}>;
  modalVista :boolean= true;
  userGridData:any=[];
  selected;
  userForm: FormGroup;
  submitted = false;
  items: FormArray;
  // Select2 Dropdown
  selectValue: string[];

  columns = [{ prop: 'agrupación' }, { name: 'Tipo' }, { name: 'Editar' } ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.rows=this.datos;
    this.temp=this.datos;
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });
  }

 

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
 
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveUser() {
    if (this.userForm.valid) {
      const name = this.userForm.get('name').value;
      const email = this.userForm.get('email').value;
      const designation = this.userForm.get('designation').value;
       this.userGridData.push({
         id: this.userGridData.length + 1,
         name,
         email,
         designation,
         projects: this.selected
       })
       this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
