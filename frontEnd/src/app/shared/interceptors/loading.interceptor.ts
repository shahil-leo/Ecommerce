import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

let pendingRequest = 0
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private excludedRoutes = ['/cart']; // Add the route you want to exclude here

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const shouldExclude = this.excludedRoutes.some(route => request.url.includes(route));

    if (!shouldExclude) {
      this.loadingService.showLoading();
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (!shouldExclude) {
          this.loadingService.hideLoading();
        }
      })
    );
  }
}

