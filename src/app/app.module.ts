import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoryComponent } from './components/history/history.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    NavbarComponent,
    HistoryComponent,
    ProjectsComponent,
    HomeworksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
