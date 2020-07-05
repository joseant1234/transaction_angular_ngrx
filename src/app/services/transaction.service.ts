import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../models/transaction.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authService: AuthService,
  ) { }


  create(transaction: Transaction) {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/transactions`)
      .collection('items')
      .add({...transaction});      
  }
}
