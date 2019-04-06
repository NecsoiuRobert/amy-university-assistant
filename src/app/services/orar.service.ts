import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrarEntry } from '../models/orar-entry';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { isNullOrUndefined, isNull } from 'util';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrarService {
  private _orarEntriesObservable: Observable<OrarEntry[]>;
  private _orarEntriesSubject: Subject<OrarEntry[]>;

  constructor(private _afDb: AngularFirestore) {
    this._orarEntriesSubject = new ReplaySubject(1);
  }

  public addOrarEntry(oraData: OrarEntry): Promise<any> {
    return this._afDb.collection('Ore').add(oraData);
  }

  public getOrarEntries(grupa?: string, zi?: string): Observable<OrarEntry[]> {
    if (isNullOrUndefined(this._orarEntriesObservable)) {
      this._orarEntriesObservable = this._afDb.collection('Ore').snapshotChanges().pipe(map(ore => ore.map(ora => ora.payload.doc.data() as OrarEntry)));
      this._orarEntriesObservable.subscribe(ore => this._orarEntriesSubject.next(ore));
    }

    return this._orarEntriesSubject.asObservable()
      .pipe(
        map(ore => {
          let oreFinal: OrarEntry[]
          oreFinal = ore.filter(ora => {
            return isNullOrUndefined(zi) || ora.day == zi;
          }).filter(ora => {
            return isNullOrUndefined(grupa) || ora.grupa == grupa;
          })
          return oreFinal;
        })
      );
  }
}
