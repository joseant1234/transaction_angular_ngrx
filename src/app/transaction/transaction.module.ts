import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TransactionComponent } from './transaction.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { SortTransactionsPipe } from '../pipes/sort-transactions.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './transaction.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    TransactionComponent,
    StatisticsComponent,
    DetailComponent,
    SortTransactionsPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('transactions', transactionReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ]
})
export class TransactionModule { }
