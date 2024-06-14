import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/api/shopping-list';
  private apiUrlDelete = 'http://localhost:3000/api/shopping-list/deleteAll';

  constructor(private http: HttpClient) { }

  getAllShoppingList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteShoppingList(): Observable<any> {
    return this.http.get(this.apiUrlDelete);
  }
  saveShoppingList(shoppingList: any): Observable<any> {
    console.log(shoppingList)
    return this.http.post<any>(this.apiUrl, shoppingList);
  }
}