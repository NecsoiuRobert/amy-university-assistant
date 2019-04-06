import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alert } from '../models/alert';
import { Observable, Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private _afDb: AngularFirestore) { }
  
  private _alertaEntriesObservable: Observable<Alert[]>;
  private _alertaEntriesSubject: Subject<Alert[]>;

  public addAlert(alertaData: Alert): Promise<any> {
    return this._afDb.collection('Alerte').add(
        { ...alertaData, timestamp: firebase.database.ServerValue.TIMESTAMP }
      );
  }

  public getAlerte(grupa?: string): Observable<Alert[]> {
    if (isNullOrUndefined(this._alertaEntriesObservable)) {
      this._alertaEntriesObservable = this._afDb.collection('Alerte').snapshotChanges().pipe(map(alerte => alerte.map(alerta => alerta.payload.doc.data() as Alert)));
      this._alertaEntriesObservable.subscribe(ore => this._alertaEntriesSubject.next(ore));
    }

    return this._alertaEntriesSubject.asObservable()
      .pipe(
        map(alerte => {
          let alerteFinal: Alert[]
          alerteFinal = alerte.filter(alerta => {
            return isNullOrUndefined(grupa) || alerta.grupa == grupa;
          })
          return alerteFinal;
        })
      );
  }
}
