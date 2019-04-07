import { Component, OnInit } from '@angular/core';
import { OrarEntry } from 'src/app/models/orar-entry';
import { OrarService } from 'src/app/services/orar.service';
import { User } from 'src/app/models/user';
import { IdentityService } from '../identity.service';

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
  selectedEntry: OrarEntry = null;
  user: User;

  constructor(private orarService: OrarService, private identityService: IdentityService) { }

  ngOnInit() {
    
    this.identityService.getFirebaseAuthState().subscribe(data1 => { 
      console.log(data1)
      if (data1 && data1.email)
      this.identityService.getUserData(data1.email).subscribe(data => {
        console.log(data);
        this.user = data;

        this.orarService.getOrarEntries(this.user.grupa, null).subscribe(
          orarEntries => {
            orarEntries.forEach(element => {
              element.hour -= 0;
              element.duration -= 0;
            });
            this.orarEntries = orarEntries;
            console.log(orarEntries);
          }
        );
      });
    })
    this.dayIndex = new Date().getDay();
  }

  getColor(type) {
    if (type === 'Toate') return '#00E0FF';
    if (type === 'Curs') return '#FFC975';
    if (type === 'Laborator') return '#9CFF75';
    if (type === 'Seminar') return '#FF9F65';
    return '#00E0FF';
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
    this.selectedEntry = null;
  }

  decrementDayIndex() {
    this.dayIndex = this.dayIndex - 1;
    if (this.dayIndex === -1) this.dayIndex = 6;
    this.selectedEntry = null;
  }

  setIndexToday() {
    this.dayIndex = new Date().getDay();
    this.selectedEntry = null;
  }

  navigate() {
    const url = 'https://www.google.com/maps?saddr=My+Location&daddr=Computer+Science+College,+Splaiul+Independenței+313,+București';
    window.open(url, '_blank');
  }

  selectEntry(entry) {
    this.selectedEntry = entry;
  }

}
