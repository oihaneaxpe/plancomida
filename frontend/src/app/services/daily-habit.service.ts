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
    console.log("service")
    return this.http.get(`${this.apiUrl}/actual/${idUser}`);
  }
}