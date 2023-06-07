import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { cartItem } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  productsArray: cartItem[] = []
  routeParam!: string
  accessToken = localStorage.getItem('accessToken') as string
  userId = localStorage.getItem('userId') as string

  constructor(
    private userService: UserService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((res: any) => { this.routeParam = res.search })
    console.log(this.routeParam)
    if (this.routeParam === 'All') {
      this.userService.allProducts().subscribe({
        next: (res) => {
          console.log(res)
          this.productsArray = res
        }
      })
    } else {
      this.userService.searchProduct(this.routeParam).subscribe({
        next: (res) => {
          this.productsArray = res
        }
      })
    }
  }
  addToCart(item: cartItem, itemId: string): Subscription | Promise<boolean> {
    if (!(this.accessToken)) {
      return this.router.navigate(['/login'])
    }
    return this.userService.addCart(item, this.userId, itemId).subscribe({
      error: (e: HttpErrorResponse) => {
        this.toaster.error(e.error)
      },
      complete: () => {
        this.toaster.success('Added to cart ')
      }
    })
  }




  addToWishList(item: cartItem, itemId: string): Subscription {
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
