import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { IdentityService } from '../user/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private identityService: IdentityService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({'email': this.emailFormControl, 'password': this.passwordFormControl});
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.identityService.LoginWithEmailAndPassword(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      ).then(
        data => {
          this.router.navigate(['account']);
        }
      ).catch(
        error => {
          this.loginForm.markAsTouched();
          this.loginForm.markAsDirty();
        }
      );
    }
  }
}
