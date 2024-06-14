import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../services/auth.service';

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule
      , RouterOutlet
      , RouterLink
      , RouterLinkActive
    // ,BrowserModule,
    // ,BrowserAnimationsModule,
    , MatSidenavModule
    , MatListModule
    , MatIconModule
    , MatToolbarModule
    , MatButtonModule
    , MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  constructor(public authService: AuthService) {
    // Simula la lógica de inicio de sesión
  }
}
