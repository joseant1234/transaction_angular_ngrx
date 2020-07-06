import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Transaction } from '../../models/transaction.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  transactions: Transaction[] = []

  private unsubscribe = new Subject();

  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('transactions')
    .pipe(takeUntil(this.unsubscribe)
    ).subscribe(transaction => {
      this.transactions = transaction.items;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  remove(uid: string): void {

  }

}
