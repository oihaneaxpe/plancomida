import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyHabitService {
  private apiUrl = 'http://localhost:3000/api/daily-habit';

  constructor(private http: HttpClient) { }

  getActualHabit(idUser: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actual/${idUser}`);
  }  
  updateActualHabit(idUser: number, dailyHabitData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/${idUser}`, dailyHabitData);
  }
}