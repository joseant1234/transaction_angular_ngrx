import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  name = '';
  private unsubscribe = new Subject();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('user').pipe(
      filter(({user}) => user !== null),
      takeUntil(this.unsubscribe),
    )
    .subscribe(({user}) => {
      // se coloca el filter porque envia como respuesta null de firebase
      this.name = user.name;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  logout(): void {
    this.authService.logout().then(_ => {
      this.router.navigate(['/login']);
    })
  }

}
