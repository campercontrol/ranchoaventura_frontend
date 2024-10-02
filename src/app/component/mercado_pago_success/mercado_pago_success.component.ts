import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mercado-pago-success',
  
  template: `
  <div class="container text-center mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-lg p-4">
        <div class="card-body">
          <!-- Iconos de estado del pago usando Font Awesome -->
          <i *ngIf="status === 'success'" class="fas fa-check-circle success-icon"></i>
          <i *ngIf="status === 'failure'" class="fas fa-times-circle error-icon"></i>
          <i *ngIf="status === 'pending'" class="fas fa-exclamation-triangle warning-icon"></i>

          <!-- Mensajes y descripciones -->
          <h1 *ngIf="status === 'success'" class="mt-3">¡Pago realizado con éxito!</h1>
          <h1 *ngIf="status === 'failure'" class="mt-3">El pago ha sido rechazado.</h1>
          <h1 *ngIf="status === 'pending'" class="mt-3">Tu pago está pendiente.</h1>

          <p *ngIf="status === 'success'" class="mt-3">
            Tu pago para el campamento ha sido procesado correctamente.
          </p>
          <p *ngIf="status === 'failure'" class="mt-3">
            Lamentablemente, tu pago fue rechazado. Por favor, intenta nuevamente.
          </p>
          <p *ngIf="status === 'pending'" class="mt-3">
            Tu pago está en proceso. Te notificaremos cuando se haya completado.
          </p>

          <!-- Botones -->
          <div class="mt-4">
            <a href="/" class="btn btn-primary">Volver a la página principal</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




`,
  styleUrls: ['./mercado_pago_success.component.css'],
})
export class MercadoPagoSuccessComponent {
  
  public status: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtenemos el fragmento de la ruta para identificar el estado del pago
    this.route.url.subscribe((urlSegment) => {
      const routePath = urlSegment[1].path; // Obtiene la primera parte de la ruta
      this.status = routePath;  // Asigna el estado de acuerdo a la ruta
    });
  }
}
