import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { constructor } from 'q';

@Component({
  selector: 'app-orar-edit',
  templateUrl: './orar-edit.component.html',
  styleUrls: ['./orar-edit.component.sass']
})
export class OrarEditComponent implements OnInit {

  orarEntryForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    acronim: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    professor: new FormControl(null, Validators.required),
    day: new FormControl(null, Validators.required),
    hour: new FormControl(null, Validators.required),
    duration: new FormControl(null, Validators.required),
    room: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required), //curs, seminar, laborator
    grupa: new FormControl('') // mandatory la seminar / laborator, null la curs 
  });

  days: ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
  grupe: ['313CC', '335CA', '343C5'];

  constructor() { }

  ngOnInit() {
  }

  getAvailableHours() {
    // TODO: make this smart
    return [8, 9, 10, 11, 12 ,13, 14, 15, 16, 17, 18, 19];
  }

  getAvailableDurations() {
    // TODO: make this smart
    return [1, 2, 3];
  }

  

}
