import { json } from 'express';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) { }

  allCart?: any
  public allProduct: any[] = []
  num!: number
  universal!: any
  fullAmount: number = 0
  ngOnInit(): void {

    this.universal = this.userService.number
    const userId: any = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')
    console.log(accessToken)
    this.userService.getCart(accessToken, userId).subscribe({
      next: (res: any) => {
        this.allCart = res[0].products
        if (this.allCart === undefined) return
        for (const products of this.allCart) {
          this.userService.findSingleProduct(products.productId).subscribe({
            next: (res) => {
              this.allProduct.push(res)

            }
          })
        }
      },
      error: (e) => { console.log(e) },
      complete: () => { 'finished' }
    })
  }
  fullDelete() {
    const userId: any = localStorage.getItem('userId')
    const accessToken: any = localStorage.getItem('accessToken')
    this.userService.deleteAllCart(userId, accessToken).subscribe(() => {
      this.allProduct = []
      this.userService.getCart(accessToken, userId).subscribe({
        next: (res: any) => {
          this.allCart = res[0].products
          if (this.allCart === undefined) return
          for (const products of this.allCart) {
            this.userService.findSingleProduct(products.productId).subscribe({
              next: (res) => { this.allProduct.push(res), console.log(this.allProduct) }
            })
          }
        },
        error: (e) => { console.log(e) },
        complete: () => { this.toaster.success('Cart cleared') }
      })
    })

  }
  deleteOne(productId: string) {
    const userId: any = localStorage.getItem('userId')
    const accessToken: any = localStorage.getItem('accessToken')
    this.userService.deleteOneCart(userId, productId, accessToken).subscribe(() => {
      this.allProduct = []
      this.userService.getCart(accessToken, userId).subscribe({
        next: (res: any) => {
          this.allCart = res[0].products
          if (this.allCart === undefined) return
          for (const products of this.allCart) {
            this.userService.findSingleProduct(products.productId).subscribe({
              next: (res) => { this.allProduct.push(res), console.log(this.allProduct) }
            })
          }
        },
        error: (e) => { console.log(e) },
        complete: () => { this.toaster.success('one Product deleted ') }
      })
    })
  }

  add(productId: string, number: number) {
    const accessToken = localStorage.getItem('accessToken')
    const userId: any = localStorage.getItem('userId')
    number++
    this.userService.updatedQuantity(productId, userId, number, accessToken).subscribe(() => {
      this.allProduct = []
      this.userService.getCart(accessToken, userId).subscribe({
        next: (res: any) => {
          this.allCart = res[0].products
          if (this.allCart === undefined) return
          for (const products of this.allCart) {
            this.userService.findSingleProduct(products.productId).subscribe({
              next: (res) => { this.allProduct.push(res) }
            })
          }
        },
        error: (e) => { console.log(e) },
        complete: () => { }
      })
    })
  }
  minus(productId: string, number: number) {
    const accessToken = localStorage.getItem('accessToken')
    const userId: any = localStorage.getItem('userId')
    number--
    console.log(number)
    if (number > 0) {
      this.userService.updatedQuantity(productId, userId, number, accessToken).subscribe(() => {
        this.allProduct = []
        this.userService.getCart(accessToken, userId).subscribe({
          next: (res: any) => {
            this.allCart = res[0].products
            if (this.allCart === undefined) return
            for (const products of this.allCart) {
              this.userService.findSingleProduct(products.productId).subscribe({
                next: (res) => { this.allProduct.push(res), console.log(this.allProduct) }
              })
            }
          },
          error: (e) => { console.log(e) },
          complete: () => { }
        })
      })
    } else {
      console.log('suii')
    }

  }


}
