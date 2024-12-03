import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

              <!-- Detalles del pago -->
              <div class="mt-3">
                <p><strong>ID del Pago:</strong> {{ queryParams?.payment_id }}</p>
                <p><strong>Estatus:</strong> {{ queryParams?.status }}</p>
                <p><strong>Tipo de Pago:</strong> {{ queryParams?.payment_type }}</p>
                <p *ngIf="queryParams?.external_reference"><strong>Referencia Externa:</strong> {{ queryParams.external_reference }}</p>
              </div>

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
export class MercadoPagoSuccessComponent implements OnInit {
  public status: string; // Para el estado del pago
  public queryParams: any = {}; // Para capturar los parámetros de la URL

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Detecta la ruta activa y establece el estado
    this.route.url.subscribe((urlSegment) => {
      const routePath = urlSegment[0]?.path; // Obtiene el primer segmento de la ruta
      if (routePath.includes('success')) {
        this.status = 'success';
      } else if (routePath.includes('failure')) {
        this.status = 'failure';
      } else if (routePath.includes('pending')) {
        this.status = 'pending';
      }
    });

    // Obtiene los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      console.log('Query Parameters:', this.queryParams);
    });
  }
}
