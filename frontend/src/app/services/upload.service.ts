import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) { }

  // Método para obtener las preferencias del usuario junto con alergias y problemas de salud
  // getUserPreferenceWithDetails(userId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/user/${userId}/preference`);
  // }

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error(error.message || error);
  }
}
