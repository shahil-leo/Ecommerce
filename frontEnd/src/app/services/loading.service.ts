import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  showLoading(): void {
    this.loadingSubject.next(true)
  }

  hideLoading(): void {
    this.loadingSubject.next(false)
  }

  get isLoading() {
    return this.loadingSubject.asObservable();
  }

}
