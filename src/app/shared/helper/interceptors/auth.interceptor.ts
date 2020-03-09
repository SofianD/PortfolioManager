import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes(env.apiUrl)) {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const authReq = request.clone({
          headers: request.headers.set('Authorization', token)
        });
        return next.handle(authReq);
      }
    }
    return next.handle(request);
  }
}
