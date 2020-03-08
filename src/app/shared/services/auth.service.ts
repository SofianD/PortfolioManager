import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Router } from '@angular/router';

const BACKEND_URL = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  async login(email: string, password: string) {
    try {
      const data = {email, password};
      this.http
        .post<{message: string, token: string, expiresIn: number}>(BACKEND_URL + 'login', {
          data
        })
        .subscribe((res) => {
          this.setAuthTimer(res.expiresIn);
          const now = new Date();
          const expirationDate = new Date( now.getTime() + res.expiresIn * 1000);
          this.saveAuthData(res.token, expirationDate);
          this.router.navigate(['logged']);
        });
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.clearAuthData();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['']);
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
