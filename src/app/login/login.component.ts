import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../user/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _identityService: IdentityService) { }

  ngOnInit() {
    this._identityService.LoginWithEmailAndPassword('mihai.lupea@gmail.com', "123456");
  }

}
