//import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FoodPlanComponent } from './food-plan/food-plan.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipiesDetailComponent } from './recipies-detail/recipies-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { DailyComponent } from './daily/daily.component';
import { BlogComponent } from './blog/blog.component';
import { TipsComponent } from './tips/tips.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddRecipieComponent } from './add-recipie/add-recipie.component';
import { BrowserModule } from '@angular/platform-browser';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    //{
      // path: '',
      // component: AppComponent,
      // children: [
      //   { path: '', redirectTo: 'home', pathMatch: 'full' },
      //   // { path: 'home', component: HomeComponent },
      //   { path: 'foodplan', component: FoodPlanComponent }
      // ]
    //},
    { path: 'home', component: HomeComponent },
    { path: 'food-plan', component: FoodPlanComponent },
    { path: 'recipies', component: RecipiesComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'recipies-detail', component: RecipiesDetailComponent },
    { path: 'recipies-detail/:id', component: RecipiesDetailComponent },
    { path: 'user-preferences', component: UserPreferencesComponent },
    { path: 'tips', component: TipsComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'daily', component: DailyComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add-recipe', component: AddRecipieComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full' },

    // Add more routes as needed
  ];


@NgModule({
    // imports: [RouterModule.forRoot(routes)],
    // exports: [RouterModule]
    // declarations: [
    //   AppComponent,
    //   HomeComponent,
    //   FoodPlanComponent,
    //   RecipiesComponent,
    //   // DailyComponent,
    //   // ReportsComponent,
    //   // BlogComponent,
    //   // TipsComponent
    // ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes) // Configura las rutas aquí
      , RouterLink, RouterLinkActive, RouterOutlet
    ],
    providers: [],
    // bootstrap: [AppComponent]
  })
  export class AppRoutingModule { }

