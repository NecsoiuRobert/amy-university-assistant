import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './login/login.component';
import { OrarEditComponent } from './admin/orar-edit/orar-edit.component';
import { OrarComponent } from './user/orar/orar.component';
import { AgendaComponent } from './user/agenda/agenda.component';
import { ActivateComponent } from './user/activate/activate.component';
import { AccountComponent } from './user/account/account.component';
import { AlertsComponent } from './alerts/alerts.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'admin', children: [
    { path: 'register', component: RegisterComponent },
    { path: 'orar', component: OrarEditComponent }
  ]},
  { path: 'user', children: [
    { path: 'orar', component: OrarComponent },
    { path: 'agenda', component: AgendaComponent },
    { path: 'activate', component: ActivateComponent },
    { path: 'account', component: AccountComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
