import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule
      , RouterOutlet
      , RouterLink
      , RouterLinkActive
      , MatSidenavModule
      , MatListModule
      , MatIconModule
      , MatToolbarModule
      , MatButtonModule
      , MatCardModule
      , MatTooltipModule
    ],
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
      link: '',//'/reports',
      disponible: false,
      anonimous: false
    },
    {
      imgPath: '/assets/images/home/blog.jfif',
      title: 'Blog',
      description: 'Lee nuestros consejos y recomendaciones.',
      icon: 'book',
      link: '',//'/blog',
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
      link: '/tips',
      disponible: true,
      anonimous: true
    },
  ];
  constructor(public authService: AuthService) {
  }

  getLink(home: any): string {
    if (!home.disponible) {
      return ''; // No navegar a ningún sitio
    }

    if (this.authService.isLoggedIn()) {
      return home.link;
    } 
    else if (home.anonimous) {
      return home.link;
    } 
    else {
      return '/login';
    }
  }
}
