import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-food-plan',
  standalone: true,
  imports: [CommonModule
            , MatIcon
          ],
  templateUrl: './food-plan.component.html',
  styleUrl: './food-plan.component.less'
})
export class FoodPlanComponent {

  constructor(public navService: NavigationService) { }

  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    mealsPerDay: { name: string, description: string }[] = [
        { name: 'Desayuno', description: 'Descripción del desayuno' },
        { name: 'Almuerzo', description: 'Descripción del almuerzo' },
        { name: 'Cena', description: 'Descripción de la cena' }
    ];

    viewMode: 'grid' | 'detail' = 'grid'; // Por defecto, la visualización será en formato de grid

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'detail' : 'grid'; // Cambiar entre grid y detail
  }
}
