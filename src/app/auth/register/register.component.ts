import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;
  unsubscribe = new Subject();

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.store.select('ui').pipe(
      takeUntil(this.unsubscribe),
    )
    .subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  createUser(): void {
    if (this.form.invalid){ return; }
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    const { name, email, password } = this.form.value;
    this.authService.createUser(name, email, password).then(credentials => {
      // Swal.close();
      this.store.dispatch(ui.stopLoading())
      this.router.navigate(['/']);
    }).catch(err => {
      this.store.dispatch(ui.stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

}
