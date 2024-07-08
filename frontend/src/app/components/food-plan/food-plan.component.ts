import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { NotificationService } from '../../services/notification.service';
import { FoodPalnService } from '../../services/food-plan.service';
import { RecipeService } from '../../services/recipe.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-food-plan',
  standalone: true,
  imports: [CommonModule
            , MatIcon
            , RouterLink
          ],
  templateUrl: './food-plan.component.html',
  styleUrl: './food-plan.component.less'
})
export class FoodPlanComponent implements OnInit {
  userId: any;
  planification: any = [];
  recipes: any = [];

  viewMode: 'grid' | 'detail' = 'grid'; // Por defecto, la visualización será en formato de grid

  daysOfWeek: { idDia: number, nombre: string }[] = [
    { idDia: 1, nombre: 'Lunes' },
    { idDia: 2, nombre: 'Martes' },
    { idDia: 3, nombre: 'Miércoles' },
    { idDia: 4, nombre: 'Jueves' },
    { idDia: 5, nombre: 'Viernes' },
    { idDia: 6, nombre: 'Sábado' },
    { idDia: 7, nombre: 'Domingo' },
  ];

  momentsOfDay = [
    { idMomento: 1, nombre: 'Desayuno' },
    { idMomento: 2, nombre: 'Almuerzo' },
    { idMomento: 3, nombre: 'Cena' }
  ];

  constructor(private router: Router,
              public navService: NavigationService,
              private foodPlanService: FoodPalnService,
              private recipeService: RecipeService,
              private notificationService: NotificationService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.generateWeeklyPlan();
  }

  generateWeeklyPlan(): void {
    this.recipeService.getRecipes(this.userId).pipe(
      tap(recipes => {
        this.recipes = recipes;
        this.planification = this.createWeeklyPlan();
      }),
      catchError(error => {
        this.notificationService.showNotification('error', 'Error', error.error.error);
        return throwError(error); // Re-throw the error to keep the observable chain
      })
    ).subscribe();
  }

  createWeeklyPlan(): any[] {
    const mealPlan = [];
    for (let day of this.daysOfWeek) {
      for (let momento of this.momentsOfDay) {
        const recipe = this.getRandomRecipe();
        if (recipe) {
          mealPlan.push({
            idUsuario: this.userId,
            idDia: day.idDia,
            idMomento: momento.idMomento,
            idReceta: recipe.idtmReceta,
            titulo: recipe.titulo,
            diaNombre: day.nombre,
            momentoNombre: momento.nombre
          });
        }
      }
    }
    return mealPlan;
  }

  getRandomRecipe(): any {
    if (this.recipes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.recipes.length);
    return this.recipes[randomIndex];
  }

  filterByDay(meals: any[], day: number): any[] {
    return meals.filter(meal => meal.idDia === day);
  }

  groupMealsByMomento(meals: any[]): any[] {
    const grouped = meals.reduce((acc, meal) => {
      if (!acc[meal.idMomento]) {
        acc[meal.idMomento] = [];
      }
      acc[meal.idMomento].push(meal);
      return acc;
    }, {});
    return Object.values(grouped);
  }

  hasMealsForMomento(meals: any[], momentoId: number): boolean {
    return meals.some(meal => meal.idMomento === momentoId);
  }

  getMealsForDayAndMomento(dayId: number, momentoId: number): any[] {
    const meals = this.filterByDay(this.planification, dayId);
    const groupedMeals = this.groupMealsByMomento(meals);
    return groupedMeals[momentoId] || [];
  }

  getMomentoNames(): string[] {
    return ['Desayuno', 'Almuerzo', 'Cena'];
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'detail' : 'grid'; // Cambiar entre grid y detail
  }
}