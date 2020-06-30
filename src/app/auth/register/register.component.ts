import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  createUser(): void {
    if (this.form.invalid){ return; }
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    const { name, email, password } = this.form.value;
    this.authService.createUser(name, email, password).then(credentials => {
      Swal.close();
      this.router.navigate(['/']);
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    });
  }

}
