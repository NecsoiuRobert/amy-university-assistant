import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { constructor } from 'q';
declare var $: any;

@Component({
  selector: 'app-orar-edit',
  templateUrl: './orar-edit.component.html',
  styleUrls: ['./orar-edit.component.sass']
})
export class OrarEditComponent implements OnInit, AfterViewInit {

  orarEntryForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    acronim: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    professor: new FormControl(null, Validators.required),
    room: new FormControl(null, Validators.required),
    grupa: new FormControl(''), // mandatory la seminar / laborator, null la curs
    day: new FormControl(null, Validators.required),
    hour: new FormControl(null, Validators.required),
    duration: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required) //curs, seminar, laborator
  });

  days = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
  grupe = ['313CC', '335CA', '343C5'];
  types = ['Curs', 'Seminar', 'Laborator'];
  rooms = ['EC004', 'EC105', 'EC101', 'EC102'];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('select').formSelect();
  }

  getAvailableHours() {
    // TODO: make this smart
    return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  }

  getAvailableDurations() {
    // TODO: make this smart
    return [1, 2, 3];
  }

  onSubmit() {
    console.log(this.orarEntryForm);
    if (this.orarEntryForm.valid) {
      console.log('valid');
    }
  }

}
