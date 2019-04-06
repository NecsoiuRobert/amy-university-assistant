import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Alert } from '../models/alert';
import { AfterViewInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    // TODO get alerts
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
      // TODO add alert
    }
  }

}
