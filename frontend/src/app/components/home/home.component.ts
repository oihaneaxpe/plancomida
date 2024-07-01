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

import { AuthService } from '../../services/auth.service';

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
  title = 'Health Planner';

  homeButtons = [
    {
      imgPath: '/assets/images/home/food-plan.jpeg',
      title: 'Planificación',
      description: 'Planifica tus menús semanales.',
      icon: 'event_note',
      link: '/food-plan',
      disponible: true,
      anonimous: false
    },
    {
      imgPath: '/assets/images/home/recipes.jfif',
      title: 'Recetas',
      description: 'Descubre nuevas recetas.',
      icon: 'restaurant_menu',
      link: '/recipies',
      disponible: true,
      anonimous: true
    },
    {
      imgPath: '/assets/images/home/reports.jfif',
      title: 'Informes',
      description: 'Analiza tu progreso.',
      icon: 'bar_chart',
      link: '/reports',
      disponible: false,
      anonimous: false
    },
    {
      imgPath: '/assets/images/home/blog.jfif',
      title: 'Blog',
      description: 'Lee nuestros consejos y recomendaciones.',
      icon: 'book',
      link: '/blog',
      disponible: false,
      anonimous: true
    },
    {
      imgPath: '/assets/images/home/habits.png',
      title: 'Resumen diario',
      description: 'Registra tu consumo diario para obtener recomendaciones.',
      icon: 'assignment',
      link: '/food-plan',
      disponible: true,
      anonimous: false
    },
    {
      imgPath: '/assets/images/home/tips.jfif',
      title: 'Consejos y trucos',
      description: 'Lee nuestros consejos y recomendaciones.',
      icon: 'lightbulb',
      link: '/food-plan',
      disponible: true,
      anonimous: true
    },
  ];
  constructor(public authService: AuthService) {
  }
}
