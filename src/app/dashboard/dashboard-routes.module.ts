import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dahsboard.routes';
import { AuthGuard } from '../services/auth.guard';
import { Routes, RouterModule } from '@angular/router';

// no se usa el can active pues no es solo la validacion que no entre a la página, sino que también no carge el módulo
const childrenRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childrenRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
