import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertsComponent } from './alerts/alerts.component';
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
import { VoiceListenerService } from './voiceAssistant/voice-listener.service';
import { ChattingService } from './voiceAssistant/chatting.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FaceMatchComponent } from './faceAuth/face-match/face-match.component';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenav, MatMenuModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FaceAuthComponent } from './faceAuth/face-auth/face-auth.component';

//const dat = (JSON.parse(strf) as any[]).map(item => new Float32Array(Object.values(item)));
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    OrarComponent,
    LoginComponent,
    AlertsComponent,
    AccountComponent,
    HomeComponent,
    ActivateComponent,
    OrarEditComponent,
    NavbarComponent,
    FaceAuthComponent,
    FaceMatchComponent
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
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,

  ],
  providers: [VoiceListenerService, ChattingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
