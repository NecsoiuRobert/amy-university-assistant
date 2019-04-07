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
  days = ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
  dayIndex: number;
  types = ['Toate', 'Curs', 'Laborator', 'Seminar'];
  typeIndex = 0;

  constructor(private orarService: OrarService) { }

  ngOnInit() {
    this.dayIndex = new Date().getDay();

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

  filterEntries(): OrarEntry[] {
    if (this.dayIndex == null) return null;
    let filtered = this.orarEntries.filter(e => e.day === this.days[this.dayIndex]);
    if (this.typeIndex !== 0) {
      return filtered.filter(e => e.type === this.types[this.typeIndex]);
    }
    return filtered;
  }

  incrementDayIndex() {
    this.dayIndex = this.dayIndex + 1;
    if (this.dayIndex === 7) this.dayIndex = 0;
  }

  decrementDayIndex() {
    this.dayIndex = this.dayIndex - 1;
    if (this.dayIndex === -1) this.dayIndex = 6;
  }

}
