import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipiesComponent } from './components/recipies/recipies.component';
import { RecipiesDetailComponent } from './components/recipies-detail/recipies-detail.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';
import { DailyComponent } from './components/daily/daily.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'; // Añade esta línea

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

declare const $: any;

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    imports: [RouterModule, RouterOutlet
              , RouterLink
              , RouterLinkActive
              , HomeComponent
              , RecipiesComponent
              , RecipiesDetailComponent
              , UserPreferencesComponent
              , DailyComponent
              , ShoppingListComponent
              , MatSidenavModule
              , MatListModule
              , MatIconModule
              , MatToolbarModule
              , MatButtonModule
              , MatMenuModule
              , HttpClientModule
              , CommonModule
            ]
})

export class AppComponent implements OnInit {
  title = 'Health Planner';
  isSmallScreen!: boolean;

  constructor(public authService: AuthService
                , private router: Router
                , private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  navigateToUserPreferences() {
    this.router.navigate(['/user-preferences']);
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
