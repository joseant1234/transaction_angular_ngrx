import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import * as actions from '../transaction/transaction.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  constructor(
    private readonly store: Store<AppState>,
    private readonly transactionService: TransactionService,
  ) { }

  ngOnInit(): void {
    // se usa el filter porque se obtiene user null cuando no se ha consultado en firebase
    this.store.select('user')
    .pipe(
      filter(auth => auth.user != null),
      takeUntil(this.unsubscribe),
    ).subscribe(({user}) => {
      this.transactionService.initTransactionsListener(user.uid).pipe(
        takeUntil(this.unsubscribe),
      ).subscribe(transactionsFromFirebase => {
        this.store.dispatch(actions.setItems({ items: transactionsFromFirebase}));
      });
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }



}
