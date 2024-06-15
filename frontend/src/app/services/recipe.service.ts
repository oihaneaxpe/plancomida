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

  getRecipeById(idRecipe: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idRecipe}`);
  }

  saveRecipe(recipe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recipe);
  }
}
