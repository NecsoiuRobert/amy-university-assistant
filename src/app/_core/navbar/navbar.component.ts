import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;
import * as M from 'materialize-css';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $
    M.Sidenav.init(this.elRef.nativeElement.querySelector('.sidenav'), {});
  }

}
