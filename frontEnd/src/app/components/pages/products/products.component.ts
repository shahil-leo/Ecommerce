import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { cartFullResponse, wishlistFullResponse } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isCategory!: boolean
  accessToken = localStorage.getItem('accessToken') as string
  userId = localStorage.getItem('userId') as string

  constructor(
    private Router: ActivatedRoute,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.Router.params.subscribe({
      next: (res: Params) => {
        if (res['category']) {
          this.isCategory = true
          this.category = res['category']
          console.log(this.category)
        } else if (res['brand']) {
          this.category = res['brand']
          console.log(this.category)
        }
      }
    })
  }

  category!: string
  productsArray: any = []


  ngOnInit(): void {
    if (this.isCategory) {
      this.userService.findCategory(this.category).subscribe({
        next: (res) => { this.productsArray = res },
        error: (e: HttpErrorResponse) => { this.toaster.error(e.error) }
      })
    } else {
      this.userService.findBrand(this.category).subscribe(
        {
          next: (res) => { this.productsArray = res, console.log(this.productsArray) },
          error: (e: HttpErrorResponse) => { console.log(e.error) },
        })
    }
  }

  addToCart(item: cartFullResponse, itemId: string): Subscription | Promise<boolean> {
    if (!(this.accessToken)) {
      return this.router.navigate(['/login'])
    }
    return this.userService.addCart(item, this.userId, itemId).subscribe({
      next(value) {
        console.log(value)
      },
      error: (e: HttpErrorResponse) => {
        this.toaster.error(e.error)
      },
      complete: () => {
        this.toaster.success('Added to cart ')
      }
    })
  }

  addToWishList(item: wishlistFullResponse, itemId: string): Subscription {
    return this.userService.addWishList(item, this.userId, itemId).subscribe({
      error: (e: HttpErrorResponse) => {
        this.toaster.error(e.error)
      },
      complete: () => {
        this.toaster.success('Added to wishlist ')
      }
    })
  }


}
