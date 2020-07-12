import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as transactionActions from '../transaction/transaction.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: User;
  get user() {
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>,
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/users`).valueChanges()
        .subscribe((fireStoreUser: any) => {
          const user = User.fromFirebase(fireStoreUser);
          this._user = user;
          this.store.dispatch(actions.setUser({ user }));
        })
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(actions.unSetUser());
        this.store.dispatch(transactionActions.unSetItems());
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      const newUser = new User(user.uid, name, user.email);
      return this.firestore.doc(`${ user.uid}/users`).set({...newUser});
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(firebaseUser => !!firebaseUser)
    )
  }


}
