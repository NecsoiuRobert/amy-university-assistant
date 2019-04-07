import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../identity.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User;

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.identityService.getFirebaseAuthState().subscribe(data1 => { 
      console.log(data1)
      if (data1 && data1.email)
      this.identityService.getUserData(data1.email).subscribe(data => {
        console.log(data);
        this.user = data;
      });
    })
  }

}
