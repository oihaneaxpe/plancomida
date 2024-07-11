import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators,  } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';
import { NotificationService } from '../../services/notification.service';
import { RecipeService } from '../../services/recipe.service';
import { UploadService } from '../../services/upload.service';
import { CategoryService } from '../../services/category.service';
import { DifficultyService } from '../../services/difficulty.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
              , ReactiveFormsModule
            ],
  templateUrl: './add-recipie.component.html',
  styleUrl: './add-recipie.component.less'
})
export class AddRecipieComponent {
  userId: any;
  recipeForm!: FormGroup;

  categories: { id: number, nombre: string, baja: boolean }[] = [];
  difficulties: { id: number, nombre: string, baja: boolean }[] = [];

  newIngredient = '';
  newStep = '';
  ingredientsList: { item: string; checked: boolean; }[] = [];
  stepsList: { item: string; checked: boolean; }[] = [];

  constructor(public navService: NavigationService
    , private recipeService: RecipeService
    , private categoryService: CategoryService
    , private difficultyService: DifficultyService
    , private fb: FormBuilder
    , private notificationService: NotificationService
    , private uploadService: UploadService
    ) {
      this.userId = localStorage.getItem('userId');
    }

  ngOnInit(): void {
    this.initForm();
    this.fetchCategory();
    this.fetchDifficulty();
  }

  initForm(): void {
    this.recipeForm = this.fb.group({
      image: [''],
      imagePath: [''],
      title: ['', Validators.required],
      subtitle: [''],
      preparationTime: ['', [Validators.required, Validators.min(1)]],
      servings: ['', [Validators.required, Validators.min(1)]],
      idCategory: [''],
      category: ['', Validators.required],
      idDifficulty: [''],
      difficulty: ['', Validators.required],
      ingredients: this.fb.array([], Validators.required),
      steps: this.fb.array([], Validators.required),
      newIngredient: [''],
      newStep: ['']
    });
  }

  fetchCategory(): void {
    this.categoryService.getAllCategory()
      .pipe(
        tap(data => {
          this.categories = data;
        }),
        catchError(error => {
          this.notificationService.showNotification('error', 'Error ', error.error.error);
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
          this.notificationService.showNotification('error', 'Error ', error.error.error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    if (this.recipeForm.value.newIngredient.trim()) {
      this.ingredients.push(
        this.fb.group({
          item: [this.recipeForm.value.newIngredient.trim(), Validators.required],
          checked: [0],
        })
      );
      this.recipeForm.patchValue({ newIngredient: '' });
    }
  }

  addStep() {
    if (this.recipeForm.value.newStep.trim()) {
      this.steps.push(
        this.fb.group({
          item: [this.recipeForm.value.newStep.trim(), Validators.required],
          checked: [1],
        })
      );
      this.recipeForm.patchValue({ newStep: '' });
    }
  }

  ingDeleteFromList(index: number) {
    this.ingredients.removeAt(index);
  }

  stepDeleteFromList(index: number) {
    this.steps.removeAt(index);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.recipeForm.patchValue({ image: e.target.result });
      };
      reader.readAsDataURL(file);

      this.uploadService
        .uploadImage(file)
        .pipe(
          tap((response) => {
            this.recipeForm.patchValue({ imagePath: response.filePath });
          }),
          catchError((error) => {
            this.notificationService.showNotification('error', 'Error ', error.error.error);
            return throwError(error); // Re-throw the error to keep the observable chain
          })
        )
        .subscribe();
    }
  }

  saveRecipe(): void {
    if (this.recipeForm.get("ingredients")?.status.toUpperCase() == 'INVALID') {
      this.notificationService.showNotification('error', 'Error ', 'Debe añadir al menos un ingrediente.');
    }
    if (this.recipeForm.get("steps")?.status.toUpperCase() == 'INVALID') {
      this.notificationService.showNotification('error', 'Error ', 'Debe añadir al menos un paso de elaboración.');
    }
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched(); // Marcar todos los controles como tocados
      return;
    }
    
    if (this.recipeForm.valid) {
      this.recipeService.saveRecipe(this.userId, this.recipeForm.value)
        .pipe(
          tap(response => {
            this.notificationService.showNotification('success', 'Actualizado', response.message);
            this.resetForm();
          }),
          catchError(error => {
            this.notificationService.showNotification('error', 'Error ', error.error.error);
            return throwError(error);
          })
        )
        .subscribe();
    }
  }
  
  resetForm() {
    this.recipeForm.reset();
    this.recipeForm.markAsUntouched(); // Desmarcar todos los controles como tocados
    this.ingredients.clear();
    this.steps.clear();
  }
}