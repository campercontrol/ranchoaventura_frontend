import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  mensajeerror: boolean = false;
  cuadroMensaje = false;
  mensajeActivo = false;


  constructor(private check: ChekpointService, private FormGroup: FormBuilder, private routesA: ActivatedRoute, private camps: CampsService) {
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

    let a = {
      "checkin": true,
      "checkin_date": b,
      "checkpoint_id": this.idCheck,
      "camper_id": this.inscribirPunto,
      "created_at": b
    }
    this.check.inscribir(a).subscribe((res: any) => {
      this.estatusUpdate = false;

      this.getColumnas();
      console.log(res);
      this.cuadroMensaje = true;
      this.mensajeActivo = true;

      setTimeout(() => {
        this.cuadroMensaje = false
        this.mensajeActivo = false;
      }, 1000);
    }, error => {
      console.log(error);
      this.estatusUpdate = false;
      this.cuadroMensaje = true;
      this.mensajeerror = true;
      setTimeout(() => {
        this.cuadroMensaje = false
        this.mensajeerror = false;

      }, 1000);

    })
  }



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
}
