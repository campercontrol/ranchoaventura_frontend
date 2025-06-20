import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { LoginComponent } from './login/login.component';
import { NewParentComponent } from './component/new-parent/new-parent.component';
import { ProspectoComponent } from './component/prospecto/prospecto.component';
import { RedirigirComponent } from './redirigir/redirigir.component';
import { ResetPaswordComponent } from './component/reset-pasword/reset-pasword.component';
import { ResetEmailComponent } from './component/reset-email/reset-email.component';
import { VerificacionCuentaComponent } from './component/verificacion-cuenta/verificacion-cuenta.component';
import { MercadoPagoSuccessComponent } from './component/mercado_pago_success/mercado_pago_success.component';

const routes: Routes = [
 // { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length

  {path:'',redirectTo:'login',pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'prospects',component:ProspectoComponent},
  {path:'Singup',component:NewParentComponent},
  {path:'reset_password',component:ResetPaswordComponent},
  {path:'verify',component:VerificacionCuentaComponent},

  { path: 'mercado_pago_success', component: MercadoPagoSuccessComponent},
  { path: 'mercado_pago_failure', component: MercadoPagoSuccessComponent },
  { path: 'mercado_pago_pending', component:  MercadoPagoSuccessComponent },
 


  {path:'reset/login',component:ResetEmailComponent},


  { path: 'dashboard', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
 // { path: 'crypto-ico-landing', component: CyptolandingComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
