import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { CategoryFullRes, brand, cartItem, fullBrandResponse, fullUserRes } from 'src/app/shared/interfaces/allinterfaceApp';
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


  accessToken = localStorage.getItem('accessToken') as string
  userId: any = localStorage.getItem('userId') as string
  allProduct: cartItem[] = []
  length!: Subject<number>
  allFeatures: CategoryFullRes[] = []
  currentUser?: fullUserRes
  brandsRes: brand[] = []
  brandsArray: string[] = []
  uniqueBrand: string[] = []
  searchValue!: string


  ngOnInit(): void {
    this.length = this.userService.cartLength
    this.oneProfile()
    this.everyCategory()
    this.gettingCart()
    this.getAllBrand()

  }
  everyCategory(): Subscription {
    return this.userService.allCategories().subscribe({
      next: (res) => this.allFeatures = res,
      error: (e: HttpErrorResponse) => this.toaster.error(e.error)
    });
  }

  oneProfile(): Subscription | string {
    if (!(this.accessToken)) {
      return 'no user is here'
    }
    return this.userService.profileOne(this.userId).subscribe({
      next: (res) => { this.currentUser = res },
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }

  gettingCart(): Subscription | string {
    if (!(this.accessToken)) {
      return 'no user is here'
    }
    return this.userService.getCart(this.userId).subscribe({
      next: (res) => { this.allProduct = res.carts, this.length.next(this.allProduct.length) },
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }

  getAllBrand(): Subscription {
    return this.userService.getAllBrand().subscribe({
      next: (res) => {
        this.brandsRes = res
        this.brandsRes.map((element: fullBrandResponse) => {
          this.brandsArray.push(element.brand)
          this.uniqueBrand = [...new Set(this.brandsArray)]
        })
      }, error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }

  submitSearch(searchValue: string) {
    this.router.navigate([`/allProducts/${searchValue}`])
  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
  }

}
