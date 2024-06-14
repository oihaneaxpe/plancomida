import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule
            , RouterOutlet
            , RouterLink
            , MatFormFieldModule
            , FormsModule
            , MatCardModule
            , MatInputModule
            , MatButtonModule
            , MatIconModule
            , MatToolbarModule
            , MatSidenavModule
            , MatListModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  // constructor(private router: Router) {}

  // onLogin() {
  //   // Aquí puedes añadir la lógica de autenticación real
  //   if (this.email === 'test@test.com' && this.password === 'password') {
  //     // Guardar el estado de login, podría ser un token en el local storage
  //     localStorage.setItem('isLoggedIn', 'true');
  //     this.router.navigate(['/home']);
  //   } else {
  //     alert('Credenciales incorrectas');
  //   }
  // }
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
