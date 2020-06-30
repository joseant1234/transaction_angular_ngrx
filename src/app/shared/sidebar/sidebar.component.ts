import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout().then(_ => {
      this.router.navigate(['/login']);
    })
  }

}
