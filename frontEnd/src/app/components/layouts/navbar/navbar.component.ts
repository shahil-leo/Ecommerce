import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { fullBrandResponse, loginUserToken, wishlist } from 'src/app/shared/interfaces/allinterfaceApp';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  acessToken = localStorage.getItem('accessToken') as string

  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { }


  accessToken: any = localStorage.getItem('accessToken')
  userId: any = localStorage.getItem('userId')
  allCart: any[] = []
  allProduct: wishlist[] = []
  length!: Subject<number>
  allFeatures: any
  currentUser!: any
  brandsRes: [] = []
  brandsArray: string[] = []
  uniqueBrand: string[] = []
  isCategoryOpen: boolean = false;
  isBrandOpen: boolean = false;
  isProfileOpen: boolean = false

  ngOnInit(): void {
    this.length = this.userService.cartLength
    this.oneProfile()
    this.everyCategory()
    this.gettingCart()
    this.getAllBrand()

  }
  everyCategory(): Subscription {
    return this.userService.allCategories().subscribe({
      next: (res: any) => {
        this.allFeatures = res;
      },
      error: (e: HttpErrorResponse) => {
        this.toaster.error(e.error);
      }
    });
  }

  oneProfile(): Subscription | string {
    if (!(this.accessToken)) {
      return 'no user is here'
    }
    return this.userService.profileOne(this.userId).subscribe({
      next: (res: loginUserToken) => { this.currentUser = res },
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }

  gettingCart(): Subscription | string {
    if (!(this.accessToken)) {
      return 'no user is here'
    }
    return this.userService.getCart(this.userId).subscribe({
      next: (res: any) => { console.log(res), this.allProduct = res.carts, this.length.next(this.allProduct.length) },
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }

  getAllBrand(): Subscription {
    return this.userService.getAllBrand().subscribe({
      next: (res: any) => {
        this.brandsRes = res
        this.brandsRes.map((element: fullBrandResponse) => {
          this.brandsArray.push(element.brand)
          this.uniqueBrand = [...new Set(this.brandsArray)]
        })
      }, error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
  }

  showHideCategory(show: boolean): void {
    this.isCategoryOpen = show;
  }
  showHideBrand(show: boolean): void {
    this.isBrandOpen = show;
  }
  showHideProfile(show: boolean): void {
    this.isProfileOpen = show
  }


}
