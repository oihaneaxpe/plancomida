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

import { UserService } from '../../services/user.service';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
            , MatListModule
            , ReactiveFormsModule 
          ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private router: Router
                , private userService: UserService
                , private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      console.log("invalid", this.registerForm.value)
      return;
    }
    const userData = this.registerForm.value;
    this.userService.register(userData)
    .pipe(
      tap(data => {
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Error registering user', error);
        return throwError(error); // Re-throw the error to keep it observable chain
      })
    )
    .subscribe();
  }
}
