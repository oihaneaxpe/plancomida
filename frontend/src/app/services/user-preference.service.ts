import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  
export class UserPreferenceService {
  private apiUrl = 'http://localhost:3000/api/user-preference';

  constructor(private http: HttpClient) { }

  getUserPreference(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para obtener las preferencias del usuario junto con alergias y problemas de salud
  getUserPreferenceWithDetails(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/preference`);
  }

  saveUserPreference(userId: number, preferences: any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/${userId}/preference`, preferences);
  }
  saveUserPreference2(userId: number, userPreference: any): Observable<any> {
    console.log(userPreference)
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/update`, userPreference);
  }
}
