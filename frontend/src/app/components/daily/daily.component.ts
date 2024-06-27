import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavigationService } from '../../services/navigation.service';
import { DailyHabitService } from '../../services/daily-habit.service';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [CommonModule
              , MatCheckbox
              , FormsModule
              , MatLabel
              , MatInputModule
              , MatFormFieldModule
              , MatIcon
              , MatCard
              , MatCardContent
              , MatToolbarModule
              , MatListModule
              , MatSelectModule
              , ReactiveFormsModule
            ],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.less'
})
export class DailyComponent implements OnInit {
  constructor(public navService: NavigationService
              , private dailyHabitService: DailyHabitService
              , private exerciseService: ExerciseService
              , private fb: FormBuilder,
              ) { }

  dailyHabitForm!: FormGroup;

  exercise: { id: number, nombre: string, baja: boolean }[] = [];
  // actualHabit: { aguaNbr: number
  //                 , horasSueno: number
  //                 , meditacionInd: boolean
  //                 , comidaSaludableInd: boolean 
  //                 , notas: string
  //                 , idUsuario: number
  //                 , idTipoEjercicio: number
  //                 , nombreEjercicio: string
  //                 , bajaInd: boolean
  //               } = { 
  //                 aguaNbr: 0, 
  //                 horasSueno: 0, 
  //                 meditacionInd: false, 
  //                 comidaSaludableInd: false, 
  //                 notas: '', 
  //                 idUsuario: 0, 
  //                 idTipoEjercicio: 0, 
  //                 nombreEjercicio: '',
  //                 bajaInd: false 
  //               };

  ngOnInit(): void {
    this.dailyHabitForm = this.fb.group({
      aguaNbr: [0, Validators.required],
      horasSueno: [0, Validators.required],
      meditacionInd: [false],
      comidaSaludableInd: [false],
      notas: [''],
      idTipoEjercicio: [-1],
      nombreEjercicio: ['']
    });
    
    this.fetchExercise();
    this.fetchDailyHabit(1);//todo
  }

  fetchExercise(): void {
    this.exerciseService.getAllExercise()
      .pipe(
        tap(data => {
          this.exercise = data;
          console.log('Exercise fetched:', data);
        }),
        catchError(error => {
          console.error('Error fetching exercise:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  fetchDailyHabit(userId: number): void {
    this.dailyHabitService.getActualHabit(userId)
      .pipe(
        tap(data => {
          if (data) {
            this.dailyHabitForm.patchValue({
              aguaNbr: data[0].aguaNbr || 0,
              horasSueno: data[0].horasSueno || 0,
              meditacionInd: data[0].meditacionInd || false,
              comidaSaludableInd: data[0].comidaSaludableInd || false,
              notas: data[0].notas || '',
              idTipoEjercicio: data[0].idTipoEjercicio || -1,
              nombreEjercicio: data[0].nombreEjercicio || ''
            });
          }
          console.log('Daily Habit fetched:', data, this.dailyHabitForm);
        }),
        catchError(error => {
          console.error('Error fetching daily habit:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  saveDailyLog() {
    if (this.dailyHabitForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const actualHabit = this.dailyHabitForm.value;
    console.log('actualHabit:', actualHabit); // Debug: Verifica los valores del formulario

    console.log(actualHabit)
    this.dailyHabitService.updateActualHabit(1, actualHabit)
      .pipe(
        tap(data => {
          console.log('Daily habit updated:', data);
        }),
        catchError(error => {
          console.error('Error updating dialy habit:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }
}
