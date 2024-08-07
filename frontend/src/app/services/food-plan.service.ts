import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodPalnService {
  private apiUrl = `${environment.apiUrl}/food-plan`;
  private recipesUrl = `${environment.apiUrl}/recipes`; // Endpoint para obtener recetas


  constructor(private http: HttpClient) { }

  getFoodPlan(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.recipesUrl);
  }

  savePlanification(idUser: number, weekPlanification: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/${idUser}`, weekPlanification);
  }
}
