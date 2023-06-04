import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private adminService: AdminService, private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.adminService.isAdmin().then((isAdmin: boolean) => {
      console.log(isAdmin);
      if (isAdmin === true) {
        return true;
      } else {
        // Redirect to login page or any other route
        return this.route.parseUrl('/adminLogin');
      }
    }).catch((error: any) => {
      console.error('Error:', error);
      // Redirect to login page or any other route
      return this.route.parseUrl('/adminLogin');
    });
  }
}


