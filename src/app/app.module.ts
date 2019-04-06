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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './_core/navbar/navbar.component';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

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
    OrarEditComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
