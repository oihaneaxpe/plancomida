import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  login(email: string, password: string): boolean {
    // Lógica de autenticación ficticia
    if (email === 'test@test.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', email);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }
}
