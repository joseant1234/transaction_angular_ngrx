import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  // dispara la subscripcion cuando se carga
  // con el take se cancela la subscripción
  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( state => {
        if (!state) { this.router.navigate(['/login']); }
      }),
      take(1)
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuth().pipe(
      tap( state => {
        if (!state) { this.router.navigate(['/login']); }
      })
    );
  }

}
