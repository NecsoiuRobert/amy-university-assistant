import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { IdentityService } from 'src/app/user/identity.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    users: new FormArray([])
  });

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.addUser();
  }

  addUser() {
    if (this.ableToAdd()) {
      const userForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        surname: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        grupa: new FormControl(null, [Validators.required]),
        sefGrupa: new FormControl(false)
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
      for (let index = 0; index < this.usersControls.length; index++) {
        const element = this.usersControls[index];
        response[index].role = element.get('sefGrupa').value ? 'sef' : 'student';
      }
      console.log(response);
      this.identityService.
    }
  }

}
