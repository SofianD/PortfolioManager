import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Router } from '@angular/router';

const BACKEND_URL = env.apiUrl + '/user/';

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
      const userData = {email, password};
      console.log(userData);
      this.http
        .post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + 'login', userData)
        .subscribe((res) => {
          console.log(res);
          this.setAuthTimer(res.expiresIn);
          const now = new Date();
          const expirationDate = new Date( now.getTime() + res.expiresIn * 1000);
          this.saveAuthData(res.token, expirationDate, res.userId);
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
    console.log('set timer: ', duration * 1000);
    this.tokenTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['']);
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
}
