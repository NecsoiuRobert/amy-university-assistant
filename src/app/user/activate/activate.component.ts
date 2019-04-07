import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityService } from '../identity.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FaceAuthComponent } from 'src/app/faceAuth/face-auth/face-auth.component';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  @ViewChild("faceDataGetterComponent")
  public faceDataGetterComponent: FaceAuthComponent;
  // TODO: face data on account activation

  user: User = null;
  userForm: FormGroup = null;

  constructor(private identityService: IdentityService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        console.log(params['id']);
        this.identityService.isUserRegistered(params['id']).then(result => {
          console.log(result)
          if (result) {
            this.router.navigate(['login']);
          } else {
            this.identityService.getUserData(this.identityService.b64DecodeUnicode(params['id'])).subscribe(
              user => {
                console.log(user);
                this.user = user;
                this.userForm = new FormGroup({
                  name: new FormControl(user.name, [ Validators.required, Validators.pattern('[a-zA-Z ]*')]),
                  surname: new FormControl(user.surname, [ Validators.required, Validators.pattern('[a-zA-Z ]*')]),
                  password: new FormControl('', [ Validators.required, Validators.minLength(6)]),
                  passwordConfirm: new FormControl('', [Validators.required, this.passwordConfirmValidator.bind(this)]),
                  faceData: new FormControl('', [])
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
    if (!this.userForm || !this.userForm.get('passowrd')) return null;
    if (control.value === this.userForm.get('passowrd').value) {return null; }
    return {'passwordsNotMatching': true};
  }

  onSubmit() {
    console.log(this.userForm);
    if (this.userForm.valid) {
      this.userForm.get('passwordConfirm').setValue(null);
      const response = this.userForm.value as User;
      console.log(response);
      response.email = this.user.email;
      this.identityService.finishRegisterIncompleteUser(response).then(
        data => {
          this.router.navigate(['login']);
        }
      );
    }
  }



  faceRecognitionComponentVisible: boolean = false;
  OpenFaceDataRegister() {
    this.faceRecognitionComponentVisible = true;
    this.faceDataGetterComponent.StartRegisteringFace(10);
  }


  faceRecognitionDataFinished(data: Float32Array[]) {
    this.faceRecognitionComponentVisible = false;
    console.log(data);

    this.userForm.get('faceData').setValue(JSON.stringify(data).toString());
  }

}
