import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodPalnService {

  private apiUrl = 'http://localhost:3000/api/food-plan';

  constructor(private http: HttpClient) { }

  getFoodPlan(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
