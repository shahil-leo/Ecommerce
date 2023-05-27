import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = localStorage.getItem('accessToken')
    const requestToken = request.clone(
      {
        setHeaders: { "token": `${accessToken}` }
      }
    )
    return next.handle(requestToken);
  }
}
