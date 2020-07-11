import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../models/transaction.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

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
    // const mappedTransaction = { description: transaction.description, type: transaction.type, amount: transaction.amount } as Transaction
    delete transaction.uid;
    return this.firestore.doc(`${uid}/transactions`)
      .collection('items')
      .add({...transaction});
  }

  initTransactionsListener(uid: string) {
    // con el snapshotChanges se obtiene el type y el payload (documento y el id)
    return this.firestore.collection(`${uid}/transactions/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any,
          }
        });
      })
    )
  }

  removeTransaction(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/transactions/items/${uidItem}`).delete();
  }
}
