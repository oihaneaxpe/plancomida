import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodPalnService {
  private apiUrl = `${environment.apiUrl}/food-plan`;

  constructor(private http: HttpClient) { }

  getFoodPlan(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
