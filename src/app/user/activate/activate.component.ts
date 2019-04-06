import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.sass']
})
export class ActivateComponent implements OnInit {

  constructor(private identityService: IdentityService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(this.identityService.b64EncodeUnicode("mihai.lupea@gmail.com"))
      console.log(this.identityService.b64DecodeUnicode("bWloYWkubHVwZWFAZ21haWwuY29t"))
      // console.log(atob(params['id']));
    })
  }

}
