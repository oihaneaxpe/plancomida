import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';

import { NavigationService } from '../../services/navigation.service';

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
            ],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.less'
})
export class DailyComponent {
  constructor(public navService: NavigationService) { }

  dailyLog = {
    waterIntake: 0,
    sleepHours: 0,
    exercise: '',
    meditation: false,
    healthyMeals: false,
    notes: ''
  };

  saveDailyLog() {
    console.log('Daily Log:', this.dailyLog);
    // Aquí puedes agregar la lógica para guardar el registro diario, como enviar los datos a un servidor
  }
}
