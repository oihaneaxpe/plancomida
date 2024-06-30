import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyHabitService {
  private apiUrl = `${environment.apiUrl}/daily-habit`;

  constructor(private http: HttpClient) { }

  getActualHabit(idUser: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actual/${idUser}`);
  }  
  updateActualHabit(idUser: number, dailyHabitData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/${idUser}`, dailyHabitData);
  }
}