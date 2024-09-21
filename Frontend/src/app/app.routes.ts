import { RouterModule, Routes } from '@angular/router';
import { UploadReceiptComponent } from './views/user/upload-receipt/upload-receipt.component';
import { RegistrationFormComponent } from './views/user/registration-form/registration-form.component';
import { NgModule } from '@angular/core';
import { EndProcessComponent } from './views/admin/end-process/end-process.component';
import { VerifyDataComponent } from './views/admin/verify-data/verify-data.component';
import { LoginComponent } from './views/admin/login/login.component';
import { Error404Component } from './errors/error-404/error-404.component';


export const routes: Routes = [
  {
    path: 'subir-recibo/:id',
    component: UploadReceiptComponent,
  },
  {
    path: 'finalizar-proceso',
    component: EndProcessComponent,
  },
  {
    path: 'verificar-registros',
    component: VerifyDataComponent,
  },
  {
    path: 'registro-aspirantes',
    component: RegistrationFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/registro-aspirantes',
    pathMatch: 'full',
  },
  { path: '**', 
    redirectTo: '/error-404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
