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

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    // Lógica de registro
    // Aquí puedes agregar lógica para registrar al usuario, por ejemplo, haciendo una solicitud a tu backend.

    console.log('Registro exitoso');
    // Redirigir al usuario a la página de inicio de sesión después del registro
    this.router.navigate(['/login']);
  }
}
