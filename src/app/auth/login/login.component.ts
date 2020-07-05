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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  unsubscribe = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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

  login(): void {
    if (this.loginForm.invalid) { return; }
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then(credentials => {
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
