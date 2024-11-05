import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  router = inject(Router);

  onLogOff() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('empErpUser');
  }
}
