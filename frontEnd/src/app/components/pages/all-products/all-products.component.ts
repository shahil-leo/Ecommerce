import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { cartFullResponse, wishlistFullResponse } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {


  productsArray!: any[]
  accessToken = localStorage.getItem('accessToken') as string
  userId = localStorage.getItem('userId') as string

  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.userService.allProducts().subscribe({
      next: (res: any) => {
        console.log(res)
        this.productsArray = res
      }
    })
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
