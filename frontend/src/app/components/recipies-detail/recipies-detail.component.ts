import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationService } from '../../services/navigation.service';

import { RecipeService } from '../../services/recipe.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { RecipeIngredient } from '../../models/recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipies-detail',
  standalone: true,
  imports: [CommonModule
            , MatCheckboxModule
          ],
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
  recipeId: number | null = null; 

  constructor(public navService: NavigationService, private recipeService: RecipeService, private route: ActivatedRoute,) { 
    
  }

  ngOnInit(): void {
    //this.recipeId = +this.route.snapshot.paramMap.get('id'); // El símbolo '+' convierte el string a number
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.recipeId = +id; // El símbolo '+' convierte el string a number
      this.fetchRecipeById(this.recipeId);
    } else {
      console.error('ID is null');
      // Aquí puedes manejar el caso donde el ID no esté presente en la URL
    }    
  }

  fetchRecipeById(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId)
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