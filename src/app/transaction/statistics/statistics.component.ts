import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  incomes = 0;
  expenses = 0;
  totalIncomes = 0;
  totalExpenses = 0;

  constructor(
    private readonly store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.store.select('transactions').subscribe(({ items }) => {
      this.generateStatistics(items);
    })
  }

  generateStatistics(items: Transaction[]) {
    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIncomes += item.amount;
        this.incomes ++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses ++;
      }
    }
  }

}
