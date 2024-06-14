import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { SearchDialogComponent } from './search-dialog/search-dialog.component'; // Asegúrate de tener un componente para la búsqueda
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { RecipiesDetailComponent } from '../recipies-detail/recipies-detail.component';
import { MatMenu } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { AddRecipieComponent } from '../add-recipie/add-recipie.component';

import { NavigationService } from '../services/navigation.service';

import { RecipeService } from '../services/recipe.service';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
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
              , AddRecipieComponent
              , HttpClientModule
              // , BrowserAnimationsModule
          ],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.less'
})
export class RecipiesComponent implements OnInit {
  isList = true;
  recipes: { id: number, titulo: string, tiempoPreparacionNbr: number, cantidadComensalNbr: number
    , idCategoria: number, idDificultad: number, baja: boolean
    , categoriaNombre: string, dificultadNombre: string, imageUrl: string }[] = [];

  //filteredRecipes = [];
  constructor(private router: Router, public dialog: MatDialog, public navService: NavigationService, private recipeService: RecipeService) {}

  searchQuery: string = '';
  selectedCategories: string[] = [];
  selectedDifficulties: string[] = [];
  selectedMoment: string[] = [];
  // Agrega más variables para otros filtros según sea necesario

  categories: string[] = ['Entrante', 'Primero', 'Segundo', 'Postre']; 
  difficulties: string[] = ['Fácil', 'Intermedio', 'Dificil', 'Muy dificil']; 
  moments: string[] = ['Desayuno', 'Comida', 'Cena', 'Almuerzo', 'Snack']; 

  clearSearch() {
    this.searchQuery = '';
  }

  search() {
    // Implementa la lógica de búsqueda con los filtros seleccionados
    console.log('Búsqueda realizada con los siguientes filtros:');
    console.log('Búsqueda:', this.searchQuery);
    console.log('Categorías seleccionadas:', this.selectedCategories);
    console.log('Momentos seleccionadas:', this.selectedMoment);
    console.log('Dificultad seleccionadas:', this.selectedDifficulties);
    // Agrega aquí la lógica para realizar la búsqueda en función de los filtros seleccionados
  }

  searchCriteria = {
    ingredientes: '',
    dificultad: '',
    momentoDia: '',
    categoria: ''
  };

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.recipeService.getRecipes()
      .pipe(
        tap(data => {
          this.recipes = data;
          console.log('Recipes fetched:', data);
        }),
        catchError(error => {
          console.error('Error fetching recipes:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }
  
  toggleView(): void {
    this.isList = !this.isList;
  }

  // openSearch(): void {
  //   const dialogRef = this.dialog.open(SearchDialogComponent, {
  //     width: '250px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.filteredRecipes = this.recipes.filter(recipe => 
  //         recipe.title.toLowerCase().includes(result.toLowerCase())
  //       );
  //     } else {
  //       this.filteredRecipes = this.recipes;
  //     }
  //   });
  // }
  
  filtersVisible: boolean = false;

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  isAscOrder = true; // Variable para controlar el orden ascendente o descendente


  goToRecipeDetail(recipeId: number) {
    console.log("aa", recipeId)
    this.router.navigate(['/recipies-detail', recipeId]);
  }

  viewRecipeDetails(id: number) {
    console.log(id)
    this.router.navigate(['/recipies-detail', id]);
  }

  sortRecipesByTitle() {
    if (this.isAscOrder) {
      this.recipes.sort((a, b) => {
        return a.titulo.localeCompare(b.titulo);
      });
    } else {
      this.recipes.sort((a, b) => {
        return b.titulo.localeCompare(a.titulo);
      });
    }
  }


  toggleSortOrder() {
    this.isAscOrder = !this.isAscOrder; // Alternar entre orden ascendente y descendente
    this.sortRecipesByTitle(); // Volver a ordenar las recetas alfabéticamente
  }

  filtersDifficulty: string[] = ['Fácil', 'Dificil', 'Muy difícil'];

  selectedFilters: string[] = [];

  // Método para alternar la selección de un filtro
  toggleFilter(filter: string): void {
    const index = this.selectedFilters.indexOf(filter);
    if (index >= 0) {
      this.selectedFilters.splice(index, 1); // Eliminar filtro si ya está seleccionado
    } else {
      this.selectedFilters.push(filter); // Agregar filtro si no está seleccionado
    }
  }

  // Método para verificar si un filtro está seleccionado
  isSelected(filter: string): boolean {
    return this.selectedFilters.includes(filter);
  }

  openAddRecipeDialog(): void {
    const dialogRef = this.dialog.open(AddRecipieComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipes.push(result);
      }
    });
  }
}
