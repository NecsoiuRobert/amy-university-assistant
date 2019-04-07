import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Alert } from '../models/alert';
import { AfterViewInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { IdentityService } from '../user/identity.service';
import { User } from '../models/user';
declare var $: any;

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, AfterViewInit {

  alertForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    announce: new FormControl(null, Validators.required),
    grupa: new FormControl(null), // mandatory la seminar / laborator, null la curs
  });

  alerts: Alert[] = [];
  grupe = ['313CC', '335CA', '343C5'];
  user: User;

  constructor(private alertService: AlertService, private identityService: IdentityService) { }

  ngOnInit() {
    this.identityService.getFirebaseAuthState().subscribe(data1 => { 
      console.log(data1)
      if (data1 && data1.email)
      this.identityService.getUserData(data1.email).subscribe(data => {
        console.log(data);
        this.user = data;
        this.alertService.getAlerte(this.user.grupa).subscribe(
          alerts => {
            this.alerts = alerts;
            console.log(alerts);
          }
        )
      });
    })
  }
  
  ngAfterViewInit() {
    $('select').formSelect();
  }

  onSubmit() {
    console.log(this.alertForm);
    if (this.alertForm.valid) {
      const response = this.alertForm.value as Alert;
      response.timestamp = new Date();
      console.log(response);
      this.alertService.addAlert(response).then(data => {
        console.log(data);
        this.alertForm.reset();
      })
    }
  }

}
