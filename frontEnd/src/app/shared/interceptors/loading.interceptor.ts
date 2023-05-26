import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
let pendingRequest = 0
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {


  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loadingService.show()
    pendingRequest = pendingRequest + 1
    return next.handle(request)
  }

  handleHideLoading() {
    pendingRequest = pendingRequest - 1
    if (pendingRequest === 0) {
      if (pendingRequest === 0) {
        this.loadingService.hide();
      }
    }
  }
}
