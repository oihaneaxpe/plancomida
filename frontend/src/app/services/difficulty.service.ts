import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DifficultyService {
  private apiUrl = 'http://localhost:3000/api/difficulty';

  constructor(private http: HttpClient) { }

  getAllDifficulty(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}