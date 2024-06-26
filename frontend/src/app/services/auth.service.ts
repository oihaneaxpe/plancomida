import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  login(email: string, token: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', email);
    localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }
}
