import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: '',
  };
  router = inject(Router);

  onLogin() {
    alert(this.loginObj.email + "   " + this.loginObj.password)
    if (
      this.loginObj.email == 'arvi' &&
      this.loginObj.password == '12345'
    ) {
      this.router.navigateByUrl('/master');
      localStorage.setItem('empErpUser', this.loginObj.email);
    } else {
      alert('Invalid Account!');
    }
  }


}
