import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from 'src/app/models/transaction.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithTransaction } from '../transaction.reducer';

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
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private readonly store: Store<AppStateWithTransaction>
  ) {

  }

  ngOnInit(): void {
    this.store.select('transactions').subscribe(({ items }) => {
      this.generateStatistics(items);
    })
  }

  generateStatistics(items: Transaction[]) {
    this.totalIncomes = 0;
    this.totalExpenses = 0;
    this.incomes = 0;
    this.expenses = 0;

    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIncomes += item.amount;
        this.incomes ++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses ++;
      }
    }

    this.doughnutChartData = [ [this.totalIncomes, this.totalExpenses]];
  }

}
