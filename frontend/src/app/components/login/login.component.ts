import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
            , MatListModule
            , ReactiveFormsModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = this.loginForm.value;

    this.userService.login(loginData)
      .pipe(
        tap(data => {
          this.authService.login(loginData.email, data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigate(['/home']);
        }),
        catchError(error => {
          console.error('Error logging in', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }  
}
