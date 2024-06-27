import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExerciseService {
  private apiUrl = 'http://localhost:3000/api/exercise';

  constructor(private http: HttpClient) { }

  getAllExercise(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

