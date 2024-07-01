import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatMenu } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AddRecipieComponent } from '../add-recipie/add-recipie.component';
import { RecipiesDetailComponent } from '../recipies-detail/recipies-detail.component';

import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { RecipeService } from '../../services/recipe.service';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [CommonModule
              , RouterOutlet
              , RouterLink
              , RecipiesDetailComponent
              , MatIconModule
              , MatMenu
              , FormsModule
              , MatCardModule
              , MatFormFieldModule
              , MatInputModule
              , MatButtonModule
              , MatSelectModule
              , MatChipsModule
              , MatToolbarModule
              , AddRecipieComponent
          ],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.less'
})
export class RecipiesComponent implements OnInit {
  isList = true;
  filtersVisible: boolean = false;
  isAscOrder = true; // Variable para controlar el orden ascendente o descendente

  searchQuery: string = '';
  selectedCategories: string[] = [];
  selectedDifficulties: string[] = [];
  selectedMoment: string[] = [];

  selectedFilters: string[] = [];

  // TODO: Consultar categorias y dificultad en BD  
  categories: string[] = ['Entrante', 'Primero', 'Segundo', 'Postre']; 
  difficulties: string[] = ['Fácil', 'Intermedio', 'Difícil', 'Muy difícil']; 

  
  recipesAll: { idtmReceta: number, titulo: string, tiempoPreparacionNbr: number, cantidadComensalNbr: number
    , idCategoria: number, idDificultad: number, baja: boolean
    , categoriaNombre: string, dificultadNombre: string, imgPath: string }[] = [];

  filteredRecipes: { idtmReceta: number, titulo: string, tiempoPreparacionNbr: number, cantidadComensalNbr: number
      , idCategoria: number, idDificultad: number, baja: boolean
      , categoriaNombre: string, dificultadNombre: string, imgPath: string }[] = [];

  constructor(private router: Router, public dialog: MatDialog, public navService: NavigationService, public authService: AuthService, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.recipeService.getRecipes()
      .pipe(
        tap(data => {
          this.recipesAll = data;
          this.filteredRecipes = this.recipesAll;
        }),
        catchError(error => {
          console.error('Error fetching recipes:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  toggleSortOrder() {
    this.isAscOrder = !this.isAscOrder; // Alternar entre orden ascendente y descendente
    this.sortRecipesByTitle(); // Volver a ordenar las recetas alfabéticamente
  }

  sortRecipesByTitle() {
    if (this.isAscOrder) {
      this.filteredRecipes.sort((a, b) => {
        return a.titulo.localeCompare(b.titulo);
      });
    } else {
      this.filteredRecipes.sort((a, b) => {
        return b.titulo.localeCompare(a.titulo);
      });
    }
  }  
  
  toggleView(): void {
    this.isList = !this.isList;
  }
    
  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  // Método para alternar la selección de un filtro
  toggleFilter(filter: string): void {
    const index = this.selectedFilters.indexOf(filter);
    if (index >= 0) {
      this.selectedFilters.splice(index, 1); // Eliminar filtro si ya está seleccionado
    } else {
      this.selectedFilters.push(filter); // Agregar filtro si no está seleccionado
    }
  }

  clearSearch() {
    this.searchQuery = '';
  }

  search() {
    // Filtrar las recetas según los filtros seleccionados
    this.filteredRecipes = this.recipesAll.filter(receta =>
      // Filtrar por nombre de receta (si se implementa)
      (!this.searchQuery || receta.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      // Filtrar por categoría
      (this.selectedCategories.length === 0 || this.selectedCategories.includes(receta.categoriaNombre)) &&
      // Filtrar por momento del día
      // (this.selectedMoment.length === 0 || this.selectedMoment.includes(receta.momento)) &&
      // Filtrar por dificultad
      (this.selectedDifficulties.length === 0 || this.selectedDifficulties.includes(receta.dificultadNombre))
    );
  }

  viewRecipeDetails(id: number) {
    this.router.navigate(['/recipies-detail', id]);
  }
}