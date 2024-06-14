import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-recipies-detail',
  standalone: true,
  imports: [CommonModule
            , MatCheckboxModule],
  templateUrl: './recipies-detail.component.html',
  styleUrl: './recipies-detail.component.less'
})
export class RecipiesDetailComponent /*implements OnInit*/ {

  constructor(public navService: NavigationService) { }

  // recipe: any;

  // constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  // ngOnInit(): void {
  //   // Obtén el ID de la URL
  //   const id = 1;//this.route.snapshot.paramMap.get('id');
  //   // Carga los datos de la receta
  //   this.recipeService.getRecipeById(id).subscribe((data: any) => {
  //     this.recipe = data;
  //     console.log(data)
  //   });
  // }

  recipie = [{
    title: 'Calabacines rellenos de garbanzos',
    subtitle: 'Calabacines rellenos de garbanzos: una receta vegetariana fácil, saludable para principiantes.',
    imageUrl: 'https://recetasveganas.net/wp-content/uploads/2019/10/recetas-vegetarianas-calabacines-rellenos-facil2.png',
    time: '10 min',
    servings: '2 pers.',
    type: 'Primero',
    difficulty: 'Media'
  }];

  ingredients = [{
    ing: "2 Calabacines grandes (mínimo 1 por persona)"
  },
  {
    ing: "200gr garbanzos cocidos"
  },
  {
    ing: "1/2 tomate"
  },
  {
    ing: "Salsa de tomate"
  }]
}
