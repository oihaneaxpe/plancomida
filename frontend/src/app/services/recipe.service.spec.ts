import { TestBed } from '@angular/core/testing';

// import { RecipeService } from './recipe.service';

// describe('RecipeService', () => {
//   let service: RecipeService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(RecipeService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createRecipe(recipe: any): Observable<any> {
    return this.http.post(this.apiUrl, recipe);
  }
}
