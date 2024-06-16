import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.less'
})
export class TipsComponent {
  tips = [
    {
      title: 'Prepara tus ingredientes con anticipación',
      description: 'Tener todos tus ingredientes listos antes de comenzar a cocinar puede hacer que el proceso sea más fluido y menos estresante.'
    },
    {
      title: 'Organiza tu despensa',
      description: 'Mantén tu despensa bien organizada y etiquetada para que puedas encontrar rápidamente lo que necesitas. Esto también ayuda a evitar el desperdicio de alimentos.'
    },    
    {
      title: 'Planifica tus comidas semanalmente',
      description: 'Dedica un tiempo cada semana para planificar tus comidas. Esto puede ayudarte a ahorrar tiempo y dinero, y asegurarte de que estás comiendo de manera equilibrada.'
    },
    {
      title: 'Aprovecha las sobras',
      description: 'Usa las sobras de la cena para preparar el almuerzo del día siguiente. Puedes reinventarlas en nuevas recetas para evitar comer lo mismo.'
    }, 
    {
      title: 'Cocina en lotes',
      description: 'Cocinar en grandes cantidades y luego congelar porciones individuales puede ser una excelente manera de ahorrar tiempo durante la semana.'
    },
    {
      title: 'Hidrátate correctamente',
      description: 'Asegúrate de beber suficiente agua a lo largo del día. La hidratación es clave para mantener tu cuerpo funcionando de manera óptima.'
    }, 
    {
      title: 'Equilibra tus comidas',
      description: 'Intenta que cada comida contenga una fuente de proteínas, carbohidratos complejos, y grasas saludables para mantenerte satisfecho y lleno de energía.'
    },
    {
      title: 'Controla las porciones',
      description: 'Usa platos más pequeños y sírvete porciones adecuadas para evitar comer en exceso.'
    }, 
    {
      title: 'Come despacio y mastica bien',
      description: 'Comer despacio y masticar bien los alimentos puede ayudar a la digestión y a que te sientas más satisfecho con menos comida.'
    },
    {
      title: 'Experimenta con nuevas recetas',
      description: 'No tengas miedo de probar nuevas recetas y técnicas de cocina. Esto puede hacer que cocinar sea más divertido y variado.'
    }, 
    {
      title: 'Lava frutas y verduras adecuadamente',
      description: 'Asegúrate de lavar bien las frutas y verduras para eliminar pesticidas y bacterias. Usa una mezcla de agua y vinagre para una limpieza más profunda.'
    },
    {
      title: 'Usa hierbas y especias frescas',
      description: 'Las hierbas y especias frescas pueden marcar una gran diferencia en el sabor de tus platos. Considera cultivar algunas en tu cocina o jardín.'
    },
    {
      title: 'Mantén tus cuchillos afilados',
      description: 'Un cuchillo afilado no solo hace que el corte sea más preciso, sino que también es más seguro de usar, ya que requiere menos fuerza y es menos probable que se deslice.'
    },
    {
      title: 'Conoce tus sustituciones',
      description: 'Aprende qué ingredientes puedes usar como sustitutos en caso de que te falte algo. Por ejemplo, el yogur griego puede sustituir a la crema agria en muchas recetas.'
    }
    // Añade más consejos aquí
  ];

  constructor(public navService: NavigationService) { }
}
