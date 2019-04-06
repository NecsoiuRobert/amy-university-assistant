import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {

  }
  navbarVisible: boolean = true;
  title = 'amy-university-assistant';

  constructor (public router: Router, public route: ActivatedRoute) {}


}
