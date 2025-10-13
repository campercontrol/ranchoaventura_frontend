import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampsService } from 'src/services/camps.service';
import { ChekpointService } from 'src/services/chekpoint.service';

@Component({
  selector: 'app-punto-control',
  templateUrl: './punto-control.component.html',
  styleUrls: ['./punto-control.component.scss']
})
export class PuntoControlComponent implements OnInit {
  selectedCustomers: any[];

  representatives: any[];
  columnas = [];
  mes = { '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril', '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto', '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre' }

  statuses: any[];
  chekpoint: FormGroup;
  letrero: boolean = false;
  updateName = "";
  updateDate = "";
  updateId = 0;
  delteStatus = false;
  rowsCheck: any = [];
  rows = {}

  loading: boolean = false;
  displayMaximizable: boolean;
  puntosControl: any = [{ name: "id" }, { name: 'nombre' }, { name: "prueba", fecha: "31 de octubre 2024", inscritos: 0, cupos: 3 }]



  activityValues: number[] = [0, 100];
  items = []
  id: any;
  fecha: any;
  visible: boolean;
  visibleCreate: boolean;
  estatusUpdate = false
  infoCamp: any = {};
  inscribirPunto: any = 0;
  idCheck = 0;
  idCamper = 0;
  numeroColumnas = 0;
  namePunto: any;
  nameCamper: any;

  mensajeerror: boolean = false;
  cuadroMensaje = false;
  mensajeActivo = false;
  @ViewChild('miInput') miInput: ElementRef;



  constructor(private check: ChekpointService, private FormGroup: FormBuilder, private routesA: ActivatedRoute, private camps: CampsService,private router: Router) {
    this.routesA.params.subscribe((params) => {
      this.id = params['id']
    })
    const currentDate = new Date();

    this.camps.getCamp(this.id).subscribe((res: any) => {
      console.log(res, 'dadasass');

      this.infoCamp = res.data
    })

  }
  cars = [{ Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  ]
  customer: any = [];
  filas: any = [];

  ngOnInit(): void {
    this.chekpoint = this.FormGroup.group({
      name: ["", Validators.required],
      chekpoint_date: ["", Validators.required],
      order: [0],
      camp_id: [0,],
    })


    this.chekpoint.patchValue({
      camp_id: this.id
    })
    this.getColumnas();



  }
  crearCheck() {
    console.log(this.chekpoint.value)
    this.check.postchekpoint(this.chekpoint.value).subscribe(
      (res: any) => {
        this.chekpoint.reset()
        this.letrero = true;
        this.getColumnas();
        this.chekpoint.patchValue({
          camp_id: this.id,
          order:0
        });
        setTimeout(() => {
          this.letrero = false;
        }, 1000);
      });
  }
  showDialog(item) {
    this.visible = true;
    console.log(item);
    this.updateName = item.name;
    this.updateDate = item.chekpoint_date;
    this.updateId = item.id;
  }

  showDialog2(item) {
    this.visibleCreate = true;
    this.idCheck = item.id;

    this.namePunto = item.name
  }

  updadte() {
    this.estatusUpdate = true;

    let a = {
      "name": this.updateName,
      "chekpoint_date": this.updateDate,
      "order": 0,
      "camp_id": this.id,
    }
    this.check.updatecheckPoint(this.updateId, a).subscribe((res: any) => {
      this.getColumnas()
      setTimeout(() => {
        this.estatusUpdate = false
        this.cerrarModal()

      }, 1000);
    })
  }
  Inscribe() {
    this.estatusUpdate = true;
    let b = new Date()
    console.log(this.customer);
     const itemIndex = this.customer.findIndex(item => item.camper.camper_id === this.inscribirPunto);

     console.log(this.inscribirPunto,itemIndex);
     if(itemIndex>-1){
      let a = {
        "checkin": true,
        "checkin_date": b,
        "checkpoint_id": this.idCheck,
        "camper_id": this.inscribirPunto,
        "created_at": b
      }
   
  
      this.check.inscribir(a).subscribe((res: any) => {
        this.estatusUpdate = false;
        this.  nameCamper = this.customer.find((data:any)=>{
          return data.camper.camper_id == this.inscribirPunto;
        })
        console.log(this.nameCamper);
        
        this.  nameCamper = this.customer[itemIndex].camper.camper_name + ' ' + this.customer[itemIndex].camper.camper_lastname_father + ' ' + this.customer[itemIndex].camper.camper_lastname_mother
 

          
  
  
        this.getColumnas();
        console.log(res);
        this.cuadroMensaje = true;
        this.mensajeActivo = true;
        this.inscribirPunto = 0;
        
        
  
        setTimeout(() => {
          this.cuadroMensaje = false
          this.miInput.nativeElement.focus();
          this.inscribirPunto =null;

        }, 5000);
      }, error => {
        console.log(error);
        this.estatusUpdate = false;
        this.cuadroMensaje = false;
        this.mensajeerror = true;
        setTimeout(() => {
          
          this.cuadroMensaje = false
          this.mensajeerror = false;
  
        }, 1000);
  
      })

     } else{
      this.mensajeerror = true;
      this.cuadroMensaje = true;
      this.estatusUpdate = false;
      setTimeout(() => {
        this.mensajeerror =false;
        this.mensajeActivo = false;
        this.cuadroMensaje = false;
        this.miInput.nativeElement.focus();
        this.inscribirPunto =null
            }, 2000);
          }
     }
   
    
  
     customSort(event: any) {
      const field = event.field;
      const order = event.order;
    
      // 🔹 Si es una columna de checkpoint
      if (field && field.startsWith('checkpoint_')) {
        const checkpointId = Number(field.replace('checkpoint_', ''));
    
        this.customer = [...this.customer].sort((a: any, b: any) => {
          const aReg = a.checkpoints?.find(
            (p: any) => p.checkpoint_id === checkpointId || p.id === checkpointId
          );
          const bReg = b.checkpoints?.find(
            (p: any) => p.checkpoint_id === checkpointId || p.id === checkpointId
          );
    
          const aVal = aReg?.checkin ? 1 : 0;
          const bVal = bReg?.checkin ? 1 : 0;
    
          // Orden ascendente o descendente según clic
          return (aVal - bVal) * order;
        });
      } else {
        // 🔹 Ordenamiento normal (nombre, id, etc.)
        this.customer = [...this.customer].sort((a: any, b: any) => {
          const v1 = this.resolveFieldData(a, field);
          const v2 = this.resolveFieldData(b, field);
    
          let result = 0;
          if (v1 == null && v2 != null) result = -1;
          else if (v1 != null && v2 == null) result = 1;
          else if (v1 == null && v2 == null) result = 0;
          else if (typeof v1 === 'string' && typeof v2 === 'string')
            result = v1.localeCompare(v2);
          else result = v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    
          return order * result;
        });
      }
    }
    
    resolveFieldData(data: any, field: string): any {
      if (!data || !field) return null;
      if (!field.includes('.')) return data[field];
    
      const fields = field.split('.');
      let value = data;
      for (const f of fields) {
        if (value == null) return null;
        value = value[f];
      }
      return value;
    }
    
    
    // Utilidad para leer campos anidados tipo 'camper.camper_name'
    
    


  delet(item: any) {
    this.delteStatus = true;


    this.check.deletePoint(item.id).subscribe((res: any) => {
      this.getColumnas()
      this.delteStatus = false;
    }, error => {
      alert('no se pudo eliminar el punto de control')
    })

  }

  cerrarModal() {
    this.visible = false;
  }
  cerrarModal2() {
    this.visibleCreate = false;
  }
  getColumnas() {
    this.check.getCheckPonitTable(Number(this.id)).subscribe((res: any) => {
      // console.log(res);
      this.columnas = res.data;
      this.numeroColumnas = this.columnas.length
      this.columnas.map((item: any) => {

        let a: string = item.chekpoint_date.slice(5, 7)

        console.log(a);
        item.chekpoint_date_esp = item.chekpoint_date.slice(8, 10) + ' de ' + this.mes[a] + ' del ' + item.chekpoint_date.slice(0, 4)
        //  console.log(this.mes[a.]);

      });
      console.log(this.columnas);


    });

    this.check.getCampscheckss(Number(this.id)).subscribe((res: any) => {
      console.log(res.data);
      this.customer = res.data





    })

  }

  rellenatabla(item) {
    let b = item;

    //console.log(this.numeroColumnas,'asass');
    if (b.length < this.numeroColumnas) {
      for (let index = b.length; index <= this.numeroColumnas; index++) {
        b.push({ checkin: false });
        index++

      }

    }


    //console.log(b);

    return b;

  }
  hypervinculo(id:any){
      this.router.navigate(['dashboard/parents/camper/'+id])
  }
  contarCheckins(columnaId: number): number {
    if (!this.customer?.length) return 0;
  
    let count = 0;
  
    for (const c of this.customer) {
      const registro = c.checkpoints?.find(
        (p: any) =>
          p.checkpoint_id === columnaId ||
          p.id === columnaId ||
          p.check_id === columnaId
      );
  
      // Contar si está marcado como "pasó"
      if (
        registro &&
        (registro.checkin === true ||
          registro.checkpoint_check === true ||
          registro.status === 'checked')
      ) {
        count++;
      }
    }
  
    return count;
  }
  
  

  
}
