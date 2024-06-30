import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})

export class DifficultyService {
  private apiUrl = `${environment.apiUrl}/difficulty`;

  constructor(private http: HttpClient) { }

  getAllDifficulty(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}