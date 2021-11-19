import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../app/components/login/login.component';
import { RegistroComponent } from '../app/components/registro/registro.component';

const routes: Routes = [
  {path: '',redirectTo: '/login',pathMatch: 'full'},
  {path: 'login',component: LoginComponent,pathMatch: 'full' },
  {path: 'registro',component: RegistroComponent,pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
