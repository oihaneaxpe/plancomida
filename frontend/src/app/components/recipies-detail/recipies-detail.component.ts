import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationService } from '../../services/navigation.service';
import { NotificationService } from '../../services/notification.service';
import { RecipeService } from '../../services/recipe.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
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

  constructor(public navService: NavigationService
                , private recipeService: RecipeService
                , private route: ActivatedRoute
                , private notificationService: NotificationService
    ) { 
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.recipeId = +id; // El símbolo '+' convierte el string a number
      this.fetchRecipeById(this.recipeId);
    } else {
      this.notificationService.showNotification('error', 'Error ', 'Receta no encontrada');
    }    
  }

  fetchRecipeById(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId)
      .pipe(
        tap(data => {
          this.recipe = data;
        }),
        catchError(error => {
          this.notificationService.showNotification('error', 'Error ', error.error.error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }
}