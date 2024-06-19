import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationService } from '../../services/navigation.service';

import { RecipeService } from '../../services/recipe.service';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RecipeIngredient } from '../../models/recipe.model';

@Component({
  selector: 'app-recipies-detail',
  standalone: true,
  imports: [CommonModule
            , MatCheckboxModule],
  templateUrl: './recipies-detail.component.html',
  styleUrl: './recipies-detail.component.less'
})
export class RecipiesDetailComponent implements OnInit {

  recipe: {
    idtmReceta: number, titulo: string, subtitulo: string, tiempoPreparacionNbr: number, cantidadComensalNbr: number
    , idCategoria: number, idDificultad: number, baja: boolean
    , categoriaNombre: string, dificultadNombre: string, imgPath: string, ingredients: any[], steps: any[]
  } = {
    idtmReceta: 0, titulo: '', subtitulo: '', tiempoPreparacionNbr: 0, cantidadComensalNbr: 0,
    idCategoria: 0, idDificultad: 0, baja: false,
    categoriaNombre: '', dificultadNombre: '', imgPath: '', ingredients: [], steps: []
  };
  constructor(public navService: NavigationService, private recipeService: RecipeService) { 
    
  }

  ngOnInit(): void {
    this.fetchRecipeById();
  }

  fetchRecipeById(): void {
    var idRecipe = 25;
    this.recipeService.getRecipeById(idRecipe)
      .pipe(
        tap(data => {
          this.recipe = data;
          // this.filteredRecipes = this.recipesAll;
          console.log('Recipes fetched:', data);          
        }),
        catchError(error => {
          console.error('Error fetching recipes:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }
}
