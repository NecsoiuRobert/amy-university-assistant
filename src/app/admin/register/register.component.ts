import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    users: new FormArray([])
  });

  constructor() { }

  ngOnInit() {
    this.addUser();
  }

  addUser() {
    if (this.ableToAdd()) {
      const userForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        surname: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        grupa: new FormControl(null, [Validators.required])
      });
      (this.registerForm.get('users') as FormArray).push(userForm);
    } else {
      this.registerForm.updateValueAndValidity();
    }
  }

  removeUser(i: number) {
    if (this.ableToRemove()) {
      (this.registerForm.get('users') as FormArray).removeAt(i);
    }
  }

  ableToRemove(): boolean {
    return this.usersControls.length > 1;
  }

  ableToAdd(): boolean {
    return this.registerForm.valid;
  }

  get usersControls() {
    return (this.registerForm.get('users') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log('valid');
      const response = (this.registerForm.get('users')  as FormArray).value as User[];
      console.log(response);
      // TODO send to FB functions
    }
  }

}
