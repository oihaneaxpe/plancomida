import { RouterModule, Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { FoodPlanComponent } from './components/food-plan/food-plan.component';
import { RecipiesComponent } from './components/recipies/recipies.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipiesDetailComponent } from './components/recipies-detail/recipies-detail.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DailyComponent } from './components/daily/daily.component';
import { BlogComponent } from './components/blog/blog.component';
import { TipsComponent } from './components/tips/tips.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddRecipieComponent } from './components/add-recipie/add-recipie.component';
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
      // , ToastrModule.forRoot({
      //   timeOut: 3000,
      //   positionClass: 'toast-top-right',
      //   preventDuplicates: true,
      //   closeButton: true
      // }),
    ],
    providers: [],
    // bootstrap: [AppComponent]
  })
  export class AppRoutingModule { }

