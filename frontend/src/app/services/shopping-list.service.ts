import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = `${environment.apiUrl}/shopping-list`;

  constructor(private http: HttpClient) { }

  getAllShoppingList(idUser: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idUser}`);
  }

  deleteShoppingList(idUser: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/deleteAll/${idUser}`);
  }
  saveShoppingList(idUser: number, shoppingList: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idUser}`, shoppingList);
  }
}