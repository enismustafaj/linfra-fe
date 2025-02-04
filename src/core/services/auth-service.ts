import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { EMPTY, from, Observable, of, switchMap } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { RestService } from './rest.service';
import { NewUser } from '../model/new_user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _auth: Auth;

  private signupUrl: string = '/api/v1/users';

  constructor(private readonly _ofApp: FirebaseApp, private restService: RestService) {
    this._auth = getAuth(_ofApp);
  }

  loginWithEmailPassword(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this._auth, email, password))
  }

  login(): Observable<UserCredential> {
    return from(signInAnonymously(this._auth));
  }

  signup(newUser: NewUser): Observable<void> {
    return this.restService.postRequest(this.signupUrl, newUser);
  }

  get token(): Observable<string> {
    const currentUser = this._auth.currentUser;
    if (currentUser) {
      return from(currentUser.getIdToken());
    }
    return this.login().pipe(switchMap(({ user }) => user.getIdToken()));
  }

  get userId(): Observable<string> {
    const currentUser = this._auth.currentUser;
    if (!currentUser) {
      return from(EMPTY);
    }
    return from(currentUser.uid);
  }

  get user(): Observable<{
    uid: string;
    createdAt?: string;
  }> {
    const currentUser = this._auth.currentUser;
    if (!currentUser) {
      return from(EMPTY);
    }

    const data = {
      uid: currentUser.uid,
      createdAt: currentUser.metadata.creationTime,
    };
    return of(data);
  }
}
