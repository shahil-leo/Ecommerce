import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { cartItem, singleProduct } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  allProduct: cartItem[] = []
  universal?: BehaviorSubject<number> | undefined
  fullAmount: number = 0
  quantity: number = 0
  accessToken = localStorage.getItem('accessToken') as string
  userId = localStorage.getItem('userId') as string



  ngOnInit(): void {
    this.universal = this.userService.number;
    this.getCart()
  }


  fullDelete(): void {
    this.userService.deleteAllCart(this.userId).subscribe({
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
      complete: () => { this.getCart() }
    })

  }
  deleteOne(productId: string): void {
    this.userService.deleteOneCart(this.userId, productId).subscribe({
      error: (e: HttpErrorResponse) => this.toaster.error(e.error),
      complete: () => this.getCart()
    })
  }

  add(itemId: string, number: number): Subscription | Promise<Boolean> {
    if (!(this.accessToken)) {
      this.toaster.show('Please login')
      return this.router.navigate(['/login'])
    }
    number++
    return this.userService.updatedQuantity(itemId, this.userId, number).subscribe({
      error: (e: HttpErrorResponse) => this.toaster.error(e.error),
      complete: () => this.getCart()
    })
  }

  minus(productId: string, number: number): void {
    number--
    if (number > 0) {
      this.userService.updatedQuantity(productId, this.userId, number,).subscribe({
        error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
        complete: () => { this.getCart() }
      })
    } else {
      console.log('one product to buy is minimum for the user')
    }
  }


  getCart(): Subscription | Promise<Boolean> {
    if (!(this.accessToken)) {
      return this.router.navigate(['/login'])
    }
    return this.userService.getCart(this.userId).subscribe({
      next: (res: any) => { this.allProduct = res.carts, this.calculateSum() },
      error: (error: HttpErrorResponse) => {
        if (error.error === null) {
          console.log('no problem')
        } else {
          this.toaster.error(error.error)
        }
      },
    })
  }

  private calculateSum(): void {
    this.fullAmount = this.allProduct.reduce((total: number, product: singleProduct) => {
      const productTotal = product.prize * product.quantity;
      return total + productTotal;
    }, 0);
    this.quantity = this.allProduct.reduce((total: number, product: singleProduct) => {
      const quantity = +product.quantity
      return total + quantity
    }, 0)
  }

  checkout() {
    this.router.navigate(['/address'])
  }

}
