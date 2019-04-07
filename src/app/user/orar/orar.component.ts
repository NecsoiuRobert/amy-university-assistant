import { Component, OnInit } from '@angular/core';
import { OrarEntry } from 'src/app/models/orar-entry';
import { OrarService } from 'src/app/services/orar.service';

@Component({
  selector: 'app-orar',
  templateUrl: './orar.component.html',
  styleUrls: ['./orar.component.scss']
})
export class OrarComponent implements OnInit {

  orarEntries: OrarEntry[] = [];

  constructor(private orarService: OrarService) { }

  ngOnInit() {
    // TODO ia grupa din userul logat
    this.orarService.getOrarEntries('313CC', null).subscribe(
      orarEntries => {
        orarEntries.forEach(element => {
          element.hour -= 0;
          element.duration -= 0;
        });
        this.orarEntries = orarEntries;
        console.log(orarEntries);
      }
    );
  }

}
