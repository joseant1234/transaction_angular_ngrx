import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactionForm: FormGroup;
  type = 'ingreso';

  constructor(
    private readonly fb: FormBuilder,
    private readonly transactionService: TransactionService,
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  save(): void {
    if (this.transactionForm.invalid) { return; }
    const { description, amount } = this.transactionForm.value;
    const transaction = new Transaction(description, amount, this.type);
    this.transactionService.create(transaction)
    .then((ref) => {
      this.transactionForm.reset();
      Swal.fire('Registro creado', description, 'success');
    })
    .catch(err => {
      Swal.fire('Error', err.message, 'error');
    });


  }

}
