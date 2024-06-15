import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationService } from '../services/navigation.service';

import { RecipeService } from '../services/recipe.service';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RecipeIngredient } from '../models/recipe.model';

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
    , categoriaNombre: string, dificultadNombre: string, imageUrl: string, ingredients: any[], steps: any[]
  } = {
    idtmReceta: 0, titulo: '', subtitulo: '', tiempoPreparacionNbr: 0, cantidadComensalNbr: 0,
    idCategoria: 0, idDificultad: 0, baja: false,
    categoriaNombre: '', dificultadNombre: '', imageUrl: '', ingredients: [], steps: []
  };
  constructor(public navService: NavigationService, private recipeService: RecipeService) { 
    
  }

  ngOnInit(): void {
    this.fetchRecipeById();
  }

  fetchRecipeById(): void {
    var idRecipe = 13;
    this.recipeService.getRecipeById(idRecipe)
      .pipe(
        tap(data => {
          this.recipe = data;
          // this.filteredRecipes = this.recipesAll;
          console.log('Recipes fetched:', data);
          
          console.log(this.recipe)
        }),
        catchError(error => {
          console.error('Error fetching recipes:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();

  }

  // recipie = [{
  //   title: 'Calabacines rellenos de garbanzos',
  //   subtitle: 'Calabacines rellenos de garbanzos: una receta vegetariana fácil, saludable para principiantes.',
  //   imageUrl: 'https://recetasveganas.net/wp-content/uploads/2019/10/recetas-vegetarianas-calabacines-rellenos-facil2.png',
  //   time: '10 min',
  //   servings: '2 pers.',
  //   type: 'Primero',
  //   difficulty: 'Media'
  // }];

  // ingredients = [{
  //   ing: "2 Calabacines grandes (mínimo 1 por persona)"
  // },
  // {
  //   ing: "200gr garbanzos cocidos"
  // },
  // {
  //   ing: "1/2 tomate"
  // },
  // {
  //   ing: "Salsa de tomate"
  // }]
}
