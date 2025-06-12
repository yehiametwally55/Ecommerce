import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let modifiedRequest = request;

    if (token) { // Only set the header if the token exists
      modifiedRequest = request.clone({
        headers: request.headers.set('token', token)
      });
    }
    // If no token, the original request (without the 'token' header) will be sent,
    // which is usually the correct behavior for a login request.

    return next.handle(modifiedRequest);
  }
}
