import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  save(): void {
    if (this.transactionForm.invalid) { return; }
    console.log(this.type)
  }

}
