import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire';
import { isNullOrUndefined, isNull } from 'util';
import { User } from '../models/user';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import * as faceapi from 'face-api.js';


@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private _authObservable: Observable<firebase.User>
  private _authSubject: Subject<firebase.User>;
  private _auth: firebase.User;
  
  private _userObservable: {[email: string]: Observable<User>} = {};
  private _userSubject: {[email: string]: Subject<User>} = {};

  private _usersFacesObservable: Observable<faceapi.LabeledFaceDescriptors[]>;
  private _usersFacesSubject: Subject<faceapi.LabeledFaceDescriptors[]>;

  constructor(private _afDb: AngularFirestore, private _afAuth: AngularFireAuth, private router: Router) {
    this._authSubject = new ReplaySubject(1);
    this._usersFacesSubject = new ReplaySubject(1);
    // this._userSubject = new ReplaySubject(1);
  }

  public getFirebaseAuthState(): Observable<firebase.User> {
    if (isNullOrUndefined(this._authObservable)) {
      this._authObservable = this._afAuth.authState;
      this._authObservable.subscribe(auth => {
        this._authSubject.next(auth);
      });
    }

    return this._authSubject.asObservable();
  }

  public getUsersFaces(): Observable<faceapi.LabeledFaceDescriptors[]> {
    if (isNullOrUndefined(this._usersFacesObservable)) {
      this._usersFacesObservable = this._afDb.collection('Users').snapshotChanges()
        .pipe(map(snaps => {
          return snaps.map(snap => snap.payload.doc.data() as User)
                      .filter(user => user.faceData)
                      .map(user => {
                        return {
                          email: user.email,
                          'faceData': (JSON.parse(user.faceData) as any[]).map(item => new Float32Array(Object.values(item)))
                        }
                      })
                      .map(user => new faceapi.LabeledFaceDescriptors(user.email, user.faceData));
        }))
        this._usersFacesObservable.subscribe(data => this._usersFacesSubject.next(data));
    }
    return this._usersFacesSubject.asObservable();
  }

  public getUserData(email?: string): Observable<User> {
    if (isNullOrUndefined(email)) {
      email = this._auth.email;
    }

    console.log(email);

    if (isNullOrUndefined(this._userObservable[email])) {
      this._userObservable[email] = this._afDb
          .collection('Users')
          .doc(email)
          .snapshotChanges().pipe(map(snap => snap.payload.data() as User));
      this._userSubject[email] = new ReplaySubject(1);
      this._userObservable[email].subscribe(user => {this._userSubject[email].next(user)});
    }

    return this._userSubject[email].asObservable();
  }

  public registerIncompleteUser(email: string, data: any): Promise<any> {
    return this._afDb.collection('Users').doc(email).set(data, { merge: true });
  }

  public async finishRegisterIncompleteUser(userData: User): Promise<any> {
    const accountKey = this.b64EncodeUnicode(userData.email);
    await this._afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password);  
    return this._afDb.collection('Users').doc(userData.email).set(userData, { merge: true });
  }

  public isUserRegistered(userKey: String): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const email = this.b64DecodeUnicode(userKey);
      this.getUserData(email).subscribe(data => {
        if (isNullOrUndefined(data.password)) {
          resolve(false);
        }
        resolve(true);
      })
    })
  }

  public LoginWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const promise = this._afAuth.auth.signInWithPopup(provider);
    promise.then(credential =>  {
      //this.updateUser(credential.user);
    });
    return promise;
  }

  signOut() {
    return this._afAuth.auth.signOut();
  }

  public b64EncodeUnicode(str: any) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        // function toSolidBytes(match, p1) {
        (match, p1) => {
          // console.debug('match: ' + match);
          return String.fromCharCode(("0x" + p1) as any);
        }));
    }
    public b64DecodeUnicode(str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      }
}