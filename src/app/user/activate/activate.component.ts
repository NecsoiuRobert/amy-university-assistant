import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityService } from '../identity.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.sass']
})
export class ActivateComponent implements OnInit {

  // TODO: face data on account activation

  user: User = null;
  userForm: FormGroup = null;

  constructor(private identityService: IdentityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        console.log(params['id']);
        this.identityService.isUserRegistered(params['id']).then(result => {
          console.log(result)
          if (result) {
            this.router.navigate(['login']);
            console.log('aaa');
          } else {
            console.log('aaa');
            this.identityService.getUserData(this.identityService.b64DecodeUnicode(params['id'])).toPromise().then(
              user => {
                console.log(user);
                this.user = user;
                this.userForm = new FormGroup({
                  name: new FormControl(user.name, [ Validators.required, Validators.pattern('[a-zA-Z ]*')]),
                  surname: new FormControl(user.surname, [ Validators.required, Validators.pattern('[a-zA-Z ]*')]),
                  password: new FormControl(null, [ Validators.required, Validators.minLength(6)]),
                  passwordConfirm: new FormControl(null, [Validators.required, this.passwordConfirmValidator.bind(this)])
                });
              }
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    });
  }

  passwordConfirmValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === this.userForm.get('passowrd').value) {return null; }
    return {'passwordsNotMatching': true};
  }

  onSubmit() {
    console.log(this.userForm);
    if (this.userForm.valid) {
      const response = this.userForm.value as User;
      console.log(response);
      this.identityService.registerIncompleteUser(this.user.email, response).then(
        data => {
          this.router.navigate(['login']);
        }
      );
    }
  }

}
