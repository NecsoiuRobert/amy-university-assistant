import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AgendaComponent } from './user/agenda/agenda.component';
import { AccountComponent } from './user/account/account.component';
import { HomeComponent } from './home/home.component';
import { ActivateComponent } from './user/activate/activate.component';
import { OrarEditComponent } from './admin/orar-edit/orar-edit.component';
import { OrarComponent } from './user/orar/orar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    OrarComponent,
    LoginComponent,
    AlertsComponent,
    AgendaComponent,
    AccountComponent,
    HomeComponent,
    ActivateComponent,
    OrarEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
