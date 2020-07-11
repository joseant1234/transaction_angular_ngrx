import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Pipe({
  name: 'sortTransactions'
})
export class SortTransactionsPipe implements PipeTransform {

  transform(items: Transaction[]): Transaction[] {
    return [...items].sort((a, b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    })
  }

}
