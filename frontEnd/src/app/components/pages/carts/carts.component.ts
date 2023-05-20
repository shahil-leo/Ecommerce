import { json } from 'express';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, forkJoin, map, observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

  allCart?: any
  allProduct: any[] = []
  num!: number
  universal!: any
  fullAmount: number = 0
  quantity: number = 0
  accessToken = localStorage.getItem('accessToken')
  userId: any = localStorage.getItem('userId')



  ngOnInit(): void {
    this.universal = this.userService.number;
    this.getCart()
  }


  fullDelete(): void {
    this.userService.deleteAllCart(this.userId, this.accessToken).subscribe(() => {
      location.reload()
    })

  }
  deleteOne(productId: string) {
    this.userService.deleteOneCart(this.userId, productId, this.accessToken).subscribe(() => {
      this.getCart()
    })
  }

  add(itemId: any, number: number) {
    console.log(itemId)
    number++
    console.log(number)
    this.userService.updatedQuantity(itemId, this.userId, number, this.accessToken).subscribe(() => {
      this.getCart()
    })
  }

  minus(productId: string, number: number) {
    number--
    if (number > 0) {
      this.userService.updatedQuantity(productId, this.userId, number, this.accessToken).subscribe({
        next: (res) => { console.log(res) }
        , error: (e) => { console.log(e) }
        , complete: () => { this.getCart() }
      })
    } else {
      console.log('one product to buy is minimum for the user')
    }
  }


  getCart() {
    this.userService.getCart(this.accessToken, this.userId).subscribe({
      next: (res: any) => { console.log(res.carts), this.allProduct = res.carts, this.calculateSum(), console.log(this.allProduct) },
      error: (error: Error) => { console.log(error) },
    })
  }

  calculateSum() {
    console.log('calculate sum')
    this.fullAmount = this.allProduct.reduce((total, product) => {
      const productTotal = product.prize * product.quantity;
      return total + productTotal;
    }, 0);
    console.log(this.fullAmount)
    this.quantity = this.allProduct.reduce((total, product) => {
      const quantity = +product.quantity
      return total + quantity
    }, 0)
  }

  checkout() {
    this.userService.checkout(this.allProduct, this.fullAmount, this.quantity)
    this.router.navigate(['/address'])
  }

}
