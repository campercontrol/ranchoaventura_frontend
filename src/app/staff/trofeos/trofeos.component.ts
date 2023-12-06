import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { TrofeosService } from 'src/services/trofeos.service';


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
  addTrofeo:boolean=false;
  statuses: any[];
  loading: boolean = false;
  editTrofeo:boolean=false;
  date :Date =new Date();
  idselect:any=0;


  activityValues: number[] = [0, 100];
  items = []
  listaTrofeos:any=[]

  constructor(private modalService: NgbModal,private fb: FormBuilder, private catalogos: CamperService,private trofeosService:TrofeosService) {
    this.getTrofeos();
   }

  ngOnInit(): void {
  }

  status(){
    this.modalVista= !this.modalVista
 }
 openModal(content: any) {
  this.modalService.open(content);
}


public addTrofeos: FormGroup = this.fb.group({
  name: ['', [Validators.required]],
  photo: ['', [Validators.required]],
  description: ['', [Validators.required, Validators.minLength(0)]],
  trophy_type: [1, [Validators.required, Validators.min(0)]],
  active: [true, [Validators.required]],
  created_at: [this.date]
})

public editformTrofeos: FormGroup = this.fb.group({
  name: ['', [Validators.required]],
  photo: ['', [Validators.required]],
  description: ['', [Validators.required, Validators.minLength(0)]],
  trophy_type: [1, [Validators.required, Validators.min(0)]],
  active: [true, [Validators.required]],
  created_at: [this.date]
})

subiendo(event: any) {
  const archivo = event.target.files[0];
  console.log(archivo);
  
  const formulario = new FormData();
  formulario.append('file', archivo)
  this.catalogos.setPhoto(formulario).subscribe((res: any) => {
    console.log(res.path);
    this.addTrofeos.patchValue({
      photo: res.path
    })
  })
}

subiendoUpdate(event: any) {
  const archivo = event.target.files[0];
  console.log(archivo);
  
  const formulario = new FormData();
  formulario.append('file', archivo)
  this.catalogos.setPhoto(formulario).subscribe((res: any) => {
    console.log(res.path);
    this.editformTrofeos.patchValue({
      photo: res.path
    })
  })
}

onSave () : void {
  this.trofeosService.setTrofeos(this.addTrofeos.value).subscribe((res) => {
    console.log(res);
    
    this.addTrofeos.reset();
    this.addTrofeos.patchValue({
      trophy_type:1
    })
    this.addTrofeo= false;
    this.getTrofeos();
    },error=>{
      console.log(error);
      
    });
}

getTrofeos(){
this.trofeosService.getTrofeos().subscribe((res:any)=>{
  this.listaTrofeos=res.data;
})
}

tipo(id){
  const data:any =[{id:0,name:'Reconocimiento'},{id:1,name:'Certificado'}]
  let b :any =data.filter((item)=>{
    return item.id == id
  })
  return b[0].name
}

select(item){
  this.idselect=item.id;
  this.editformTrofeos.patchValue({
    name:item.name,
    photo:item.photo,
    description:item.description,
    trophy_type:item.trophy_type,
    active:item.active,
  })
  this.editTrofeo=!this.editTrofeo;
}
update(){
  this.trofeosService.editarTrofeos(this.editformTrofeos.value,this.idselect).subscribe((res) => {
    console.log(res);
    
    this.editformTrofeos.reset();
    this.addTrofeos.patchValue({
      trophy_type:1
    })
    this.editTrofeo= false;
    this.getTrofeos();
    },error=>{
      console.log(error);
      
    });
}

/**
 * Open extra large modal
 * @param exlargeModal extra large modal data
 */
extraLarge(exlargeModal: any) {
  this.modalService.open(exlargeModal, { size: 'xl', centered: true });
}
}
