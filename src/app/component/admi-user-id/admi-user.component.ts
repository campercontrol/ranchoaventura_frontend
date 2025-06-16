import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-admi-user-id',
  templateUrl: './admi-userId.component.html',
  styleUrls: ['./admi-userId.component.scss']
})
export class AdmiUserComponentId implements OnInit {
  formFood2: FormGroup;
  updateId = 0;
  cargando = true;
  spinner = false;
  statuAgrgado = false;
  rol: any[] = [];
  staff2: boolean = false;
  data: any; // Added property to fix the error
  displayColumns: string[];
  columns: string[];


  constructor(
    private fb: FormBuilder,
    private catalogos: CatalogosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formFood2 = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      hashed_pass: [''],
      role_id: [0, [Validators.required, Validators.min(1)]],
      is_coordinator: [false],
      is_admin: [false],
      is_employee: [false],
      is_superuser: [false],
      is_active: [true]
    });

    this.catalogos.getRol().subscribe((res: any) => {
      this.rol = res.data;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updateId = +id;
      this.cargando = true;

      this.catalogos.getinfodelet(this.updateId).subscribe((res: any) => {
        console.log(res);
        this.cargando = false;
       
    
        if (res.role_id == 1) { 
          this.data = res.campers;
          this.columns = ['camper_fullname', 'camps'];
          this.displayColumns = ['Hijos', 'Campamentos'];
        } else if (res.role_id == 2) {
          this.data = res.staff_in_camp;
          this.columns = ['name', 'id'];
          this.displayColumns = ['Campamentos Apuntados', 'ID'];
        } else if (res.role_id == 3) {
          this.data = res.school_camps;
          this.columns = ['name'];
          this.displayColumns = ['Campamentos'];
        }
      }, error => {
        this.cargando = false;
        alert('No se pudo Agregar');
      });
    }
  }

  keepUpdate() {
    this.spinner = true;
    const form = {
      email: this.formFood2.get('email')?.value,
      role_id: this.formFood2.get('role_id')?.value,
      is_coordinator: this.formFood2.get('is_coordinator')?.value,
      is_admin: this.formFood2.get('is_admin')?.value,
      is_employee: this.formFood2.get('is_employee')?.value,
      is_superuser: this.formFood2.get('is_superuser')?.value,
      is_active: this.formFood2.get('is_active')?.value,
    };
    const pass = this.formFood2.get('hashed_pass')?.value.trim();
    if (pass.length > 0) form['hashed_pass'] = pass;

    this.catalogos.patchUser(form, this.updateId).subscribe({
      next: (res: any) => {
        this.spinner = false;
        this.statuAgrgado = true;
        setTimeout(() => {
          this.statuAgrgado = false;
          this.router.navigate(['/dashboard/admi/user']);
        }, 1000);
      },
      error: () => {
        this.spinner = false;
        alert('No se pudo actualizar');
      }
    });
  }

  cancelarUpdate() {
    this.router.navigate(['/dashboard/admi/user']);
  }

  getCampsSummary(camps: any[]): string {
    return camps.map(camp => camp.name).join(', ');
  }
}
