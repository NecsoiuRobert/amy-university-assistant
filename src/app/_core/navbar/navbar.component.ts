import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;
import * as M from 'materialize-css';
import { IdentityService } from 'src/app/user/identity.service';
import { User } from 'src/app/models/user';
import { ChattingService } from 'src/app/voiceAssistant/chatting.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private elRef: ElementRef, private identityService: IdentityService, private _chattingService: ChattingService, private router: Router) { }

  ngOnInit() {
    this.identityService.getFirebaseAuthState().subscribe(data1 => { 
      console.log(data1)
      if (data1! && data1.email) {
        this.identityService.getUserData(data1.email).subscribe(data => {
          console.log(data);
          this._chattingService.activate_listener();
          this.user = data;
        });
      }
    })

    this._chattingService.finishedCommand.asObservable().subscribe(command => {
      console.log(command);
      if (command.intentName) {
        switch(command.intentName) {
          case 'nav.show_orar':
            if (isNullOrUndefined(command.any) || command.any === '') {
              this.router.navigate(['user', 'orar']);
            }
            break;
          case 'nav.show_anunturi':
            this.router.navigate(['user', 'anunturi']);
            break;
        }
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
