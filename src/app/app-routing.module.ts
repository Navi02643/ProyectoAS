import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { ProjectsComponent } from './components/projects/projects.component';


const routes: Routes = [
  {path: '',redirectTo: '/login',pathMatch: 'full'},
  {path: 'login',component: LoginComponent,pathMatch: 'full' },
  {path: 'registro',component: RegistroComponent,pathMatch: 'full' },
  {path: 'home',component:HomeComponent, pathMatch: 'full'},
  {path: 'proyects',component:ProjectsComponent, pathMatch: 'full'},
  {path: 'homeworks',component:HomeworksComponent, pathMatch: 'full'},
  {path: 'history',component:HistoryComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
