import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

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
            ],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.less'
})
export class DailyComponent implements OnInit {
  constructor(public navService: NavigationService
              , private dailyHabitService: DailyHabitService
              , private exerciseService: ExerciseService) { }

  exercise: { id: number, nombre: string, baja: boolean }[] = [];
  actualHabit: { aguaNbr: number
                  , horasSueno: number
                  , meditacionInd: boolean
                  , comidaSaludableInd: boolean 
                  , notas: string
                  , idUsuario: number
                  , idTipoEjercicio: number
                  , nombreEjercicio: string
                  , bajaInd: boolean
                }[] = [{ 
                  aguaNbr: 0, 
                  horasSueno: 0, 
                  meditacionInd: false, 
                  comidaSaludableInd: false, 
                  notas: '', 
                  idUsuario: 0, 
                  idTipoEjercicio: 0, 
                  nombreEjercicio: '',
                  bajaInd: false 
                }];

  ngOnInit(): void {
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
          this.actualHabit = data;
          console.log('Daily Habit fetched:', data);
        }),
        catchError(error => {
          console.error('Error fetching daily habit:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  saveDailyLog() {
    //console.log('Daily Log:', this.dailyLog);
    // Aquí puedes agregar la lógica para guardar el registro diario, como enviar los datos a un servidor
  }
}
