import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { IdentityService } from '../user/identity.service';
import { FaceMatchComponent } from '../faceAuth/face-match/face-match.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("faceDataGetterComponent")
  public faceDataGetterComponent: FaceMatchComponent;
  
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
          this.router.navigate(['user', 'account']);
        }
      ).catch(
        error => {
          this.loginForm.markAsTouched();
          this.loginForm.markAsDirty();
        }
      );
    }
  }

  mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
  }

  
  faceRecognitionComponentVisible: boolean = false;
  OpenFaceDataRegister() {
    this.faceRecognitionComponentVisible = true;
    this.faceDataGetterComponent.StartRegisteringFace(10);
  }


  faceRecognitionDataFinished(data: any[]) {
    this.faceRecognitionComponentVisible = false;
    console.log(data);
    let bestUser = this.mode(data);

    this.identityService.getUserData(bestUser).subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.loginForm.get('email').setValue(bestUser);
        this.loginForm.get('password').setValue(data.password);
        this.onSubmit();
      } else {
        console.error("Ce-i fa asta?");
      }
      
    })
  }

    // this.loginForm.get('faceData').setValue(JSON.stringify(data).toString());
  loginWithGoogle() {
    this.identityService.googleLogin().then(data => {
      this.router.navigate(['user', 'account']);
    })
  }
}
