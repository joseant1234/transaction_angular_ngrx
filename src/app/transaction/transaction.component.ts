import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {

  transactionForm: FormGroup;
  type = 'ingreso';
  loading = false;
  unsubscribe = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly transactionService: TransactionService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('ui').pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(ui => this.loading = ui.isLoading);
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  save(): void {
    if (this.transactionForm.invalid) { return; }

    this.store.dispatch(ui.isLoading());
    const { description, amount } = this.transactionForm.value;
    const transaction = new Transaction(description, amount, this.type);
    this.transactionService.create(transaction)
    .then((ref) => {
      this.transactionForm.reset();
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Registro creado', description, 'success');
    })
    .catch(err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Error', err.message, 'error');
    });


  }

}
