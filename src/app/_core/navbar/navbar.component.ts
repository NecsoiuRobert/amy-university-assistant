import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;
import * as M from 'materialize-css';
import { IdentityService } from 'src/app/user/identity.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private elRef: ElementRef, private identityService: IdentityService, private router: Router) { }

  ngOnInit() {
    this.identityService.getFirebaseAuthState().subscribe(data1 => { 
      console.log(data1)
      if (data1! && data1.email) {
        this.identityService.getUserData(data1.email).subscribe(data => {
          console.log(data);
          this.user = data;
        });

      }
    })
  }

  logout() {
    this.identityService.signOut().then(
      data => {
        this.user = null;
        this.router.navigate(['home']);
      }
    );
  }

}
