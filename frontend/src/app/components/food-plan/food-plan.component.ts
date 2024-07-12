import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
            , RouterLink
            , MatIcon        
            , MatTooltipModule
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

  constructor(public navService: NavigationService,
              private foodPlanService: FoodPalnService,
              private recipeService: RecipeService,
              private notificationService: NotificationService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchFoodPlan(this.userId);
  }

  fetchFoodPlan(idUser: number): void {
    this.foodPlanService.getFoodPlan(idUser)
      .pipe(
        tap(data => {
          this.planification = data;
        }),
        catchError(error => {
          console.error('Error fetching Food Plan:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
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
        if (momento.idMomento == 1) { // desayuno
          const recipeDesayuno = this.getRandomRecipeByCategory('Desayuno');
          if (recipeDesayuno) {
            mealPlan.push({
              idUsuario: this.userId,
              idDia: day.idDia,
              idMomento: momento.idMomento,
              idReceta: recipeDesayuno.idtmReceta,
              titulo: recipeDesayuno.titulo,
              diaNombre: day.nombre,
              momentoNombre: momento.nombre,
              icono: 'free_breakfast'
            });
          }
        }
        else {
          const recipePrimero = this.getRandomRecipeByCategory('Primero');
          if (recipePrimero) {
            mealPlan.push({
              idUsuario: this.userId,
              idDia: day.idDia,
              idMomento: momento.idMomento,
              idReceta: recipePrimero.idtmReceta,
              titulo: recipePrimero.titulo,
              diaNombre: day.nombre,
              momentoNombre: momento.nombre,
              icono: 'restaurant_menu'
            });
          }
          const recipeSegundo = this.getRandomRecipeByCategory('Segundo');
          if (recipeSegundo) {
            mealPlan.push({
              idUsuario: this.userId,
              idDia: day.idDia,
              idMomento: momento.idMomento,
              idReceta: recipeSegundo.idtmReceta,
              titulo: recipeSegundo.titulo,
              diaNombre: day.nombre,
              momentoNombre: momento.nombre,
              icono: 'dinner_dining'
            });
          }
          const recipePostre = this.getRandomRecipeByCategory('Postre');
          if (recipePostre) {
            mealPlan.push({
              idUsuario: this.userId,
              idDia: day.idDia,
              idMomento: momento.idMomento,
              idReceta: recipePostre.idtmReceta,
              titulo: recipePostre.titulo,
              diaNombre: day.nombre,
              momentoNombre: momento.nombre,
              icono: 'cake'
            });
          }
        }
        
      }
    }
    return mealPlan;
  }

  saveWeeklyPlan(): void {
    console.log("save plan")
  }

  getRandomRecipe(): any {
    if (this.recipes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.recipes.length);
    return this.recipes[randomIndex];
  }
  
  getRandomRecipeByCategory(category: string): any {
    // Filtrar recetas por categoría
    const filteredRecipes = this.recipes.filter((recipe: any) => recipe.categoriaNombre === category);

    // Verificar si hay recetas disponibles en la categoría
    if (filteredRecipes.length === 0) return null;
  
    // Seleccionar una receta aleatoria de las filtradas
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    return filteredRecipes[randomIndex];
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