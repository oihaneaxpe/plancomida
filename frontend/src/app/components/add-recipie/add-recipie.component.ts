import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { NavigationService } from '../../services/navigation.service';

import { RecipeService } from '../../services/recipe.service';
import { CategoryService } from '../../services/category.service';
import { DifficultyService } from '../../services/difficulty.service';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Ingredient {
  item: string;
  checked: number;
}

interface Step {
  item: string;
  checked: number;
}

@Component({
  selector: 'app-add-recipie',
  standalone: true,
  imports: [CommonModule
              , MatInputModule
              , MatSelectModule
              , MatListModule
              , FormsModule
              , MatCheckboxModule
              , MatRadioModule
              , MatIcon
              , MatCardModule
              , MatDialogContent
              , MatDialogActions
            ],
  templateUrl: './add-recipie.component.html',
  styleUrl: './add-recipie.component.less'
})
export class AddRecipieComponent {
  recipe = {
    image: '',
    title: '',
    subtitle: '',
    preparationTime: '',
    servings: '',
    idCategory: '',
    category: '',
    idDifficulty: '',
    difficulty: '',
    ingredients: [] as Ingredient[],  // Tipamos el array correctamente
    steps: [] as Step[]
  };

  categories: { id: number, nombre: string, baja: boolean }[] = [];
  difficulties: { id: number, nombre: string, baja: boolean }[] = [];

  newIngredient = '';
  newStep = '';
  ingredientsList: { item: string; checked: boolean; }[] = [];
  stepsList: { item: string; checked: boolean; }[] = [];

  constructor(public navService: NavigationService
    , private recipeService: RecipeService
    , private categoryService: CategoryService
    , private difficultyService: DifficultyService) {}


  ngOnInit(): void {
    this.fetchCategory();
    this.fetchDifficulty();
  }

  fetchCategory(): void {
    this.categoryService.getAllCategory()
      .pipe(
        tap(data => {
          this.categories = data;
        }),
        catchError(error => {
          console.error('Error fetching category:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  fetchDifficulty(): void {
    this.difficultyService.getAllDifficulty()
      .pipe(
        tap(data => {
          this.difficulties = data;
        }),
        catchError(error => {
          console.error('Error fetching difficulty:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.recipe.image = reader.result as string;
      };
    }
  }

  saveRecipe(): void {
    this.recipeService.saveRecipe(this.recipe)
      .pipe(
        tap(response => {
          console.log('Recipe saved successfully:', response);
          // Optionally, reset the form or navigate to another page
          this.resetForm();
        }),
        catchError(error => {
          console.error('Error saving recipe:', error);
          return throwError(error); // Re-throw the error to keep the observable chain
        })
      )
      .subscribe();
  }

  resetForm() {
    this.recipe = {
      image: '',
      title: '',
      subtitle: '',
      preparationTime: '',
      servings: '',
      idCategory: '',
      category: '',
      idDifficulty: '',
      difficulty: '',
      ingredients: [] as Ingredient[],
      steps: [] as Step[]
    };
  }

  addIngredient() {
    if (this.newIngredient.trim()) {
      this.recipe.ingredients.push({ item: this.newIngredient.trim(), checked: 0 });
      this.newIngredient = '';
    }
  }

  addStep() {
    if (this.newStep.trim()) {
      this.recipe.steps.push({ item: this.newStep.trim(), checked: 1 });
      this.newStep = '';
    }
  }

  ingDeleteFromList(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }
  stepDeleteFromList(index: number) {
    this.recipe.steps.splice(index, 1);
  }
}