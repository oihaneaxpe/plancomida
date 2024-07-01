import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

import { Router, RouterOutlet, RouterLink } from '@angular/router';

import { NavigationService } from '../../services/navigation.service';
import { FoodPalnService } from '../../services/food-paln.service';

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

  planification = [];
  viewMode: 'grid' | 'detail' = 'grid'; // Por defecto, la visualización será en formato de grid

  daysOfWeek: { idDia: number, nombre: string }[] = [
    {idDia: 1, nombre: 'Lunes'},
    {idDia: 2, nombre: 'Martes'},
    {idDia: 3, nombre: 'Miércoles'},
    {idDia: 4, nombre: 'Jueves'},
    {idDia: 5, nombre: 'Viernes'},
    {idDia: 6, nombre: 'Sábado'},
    {idDia: 7, nombre: 'Domingo'},
  ];

  momentsOfDay = [
    { idMomento: 1, nombre: 'Desayuno' },
    { idMomento: 2, nombre: 'Almuerzo' },
    { idMomento: 3, nombre: 'Cena' }
  ];

  mealsPerDay: { name: string, description: string }[] = [
    { name: 'Desayuno', description: 'Descripción del desayuno' },
    { name: 'Almuerzo', description: 'Descripción del almuerzo' },
    { name: 'Cena', description: 'Descripción de la cena' }
  ];
 
  constructor(private router: Router, public navService: NavigationService, private foodPlanService: FoodPalnService) { }

  ngOnInit(): void {
    this.fetchFoodPlan();
  }

  fetchFoodPlan(): void {
    this.foodPlanService.getFoodPlan()
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
