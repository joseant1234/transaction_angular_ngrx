import { Routes } from '@angular/router';
import { StatisticsComponent } from '../transaction/statistics/statistics.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { DetailComponent } from '../transaction/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'transactions', component: TransactionComponent },
  { path: 'detail', component: DetailComponent }
]
