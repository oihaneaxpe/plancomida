import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { SearchDialogComponent } from './search-dialog/search-dialog.component'; // Asegúrate de tener un componente para la búsqueda
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

import { NavigationService } from '../../services/navigation.service';
import { RecipeService } from '../../services/recipe.service';

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
              , MatToolbarModule
              , AddRecipieComponent
              , HttpClientModule
              // , BrowserAnimationsModule
          ],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.less'
})
export class RecipiesComponent implements OnInit {
  isList = true;
  recipesAll: { idtmReceta: number, titulo: string, tiempoPreparacionNbr: number, cantidadComensalNbr: number
    , idCategoria: number, idDificultad: number, baja: boolean
    , categoriaNombre: string, dificultadNombre: string, imageUrl: string }[] = [];

  filteredRecipes: { idtmReceta: number, titulo: string, tiempoPreparacionNbr: number, cantidadComensalNbr: number
      , idCategoria: number, idDificultad: number, baja: boolean
      , categoriaNombre: string, dificultadNombre: string, imageUrl: string }[] = [];
  // filteredRecipes = [];
  constructor(private router: Router, public dialog: MatDialog, public navService: NavigationService, private recipeService: RecipeService) {}

  filtersVisible: boolean = false;
  isAscOrder = true; // Variable para controlar el orden ascendente o descendente

  searchQuery: string = '';
  selectedCategories: string[] = [];
  selectedDifficulties: string[] = [];
  selectedMoment: string[] = [];
  // Agrega más variables para otros filtros según sea necesario

  categories: string[] = ['Entrante', 'Primero', 'Segundo', 'Postre']; 
  difficulties: string[] = ['Fácil', 'Intermedio', 'Difícil', 'Muy difícil']; 
  moments: string[] = ['Desayuno', 'Comida', 'Cena', 'Almuerzo', 'Snack']; //TODO: Pendiente de implementar

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
      
    // Aquí puedes hacer algo con las recetas filtradas, como mostrarlas en la interfaz
    console.log('Recetas encontradas:', this.filteredRecipes);
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
          this.recipesAll = data;
          this.filteredRecipes = this.recipesAll;
          console.log('Recipes fetched:', data, this.filteredRecipes);
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
  
  
  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  goToRecipeDetail(recipeId: number) {
    console.log("aa", recipeId)
    this.router.navigate(['/recipies-detail', recipeId]);
  }

  viewRecipeDetails(id: number) {
    console.log("id", id)
    this.router.navigate(['/recipies-detail', id]);
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


  toggleSortOrder() {
    this.isAscOrder = !this.isAscOrder; // Alternar entre orden ascendente y descendente
    this.sortRecipesByTitle(); // Volver a ordenar las recetas alfabéticamente
  }

  filtersDifficulty: string[] = ['Fácil', 'Difícil', 'Muy difícil'];

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
        this.filteredRecipes.push(result);
      }
    });
  }
}