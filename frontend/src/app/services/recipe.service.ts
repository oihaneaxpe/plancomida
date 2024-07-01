import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.apiUrl}/recipes`;

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

  getAllIngredients(idUser: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ingredients/${idUser}`);
  }
}
