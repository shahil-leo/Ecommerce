import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }
  number = new BehaviorSubject(1)
  allCart?: any
  public allProduct: any[] = []

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken')
    console.log(accessToken)
    this.userService.getCart(accessToken).subscribe({
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
      complete: () => { 'finished' }
    })
    console.log(this.allProduct)

  }
  fullDelete() {
    const userId: any = localStorage.getItem('userId')
    const accessToken: any = localStorage.getItem('accessToken')
    this.userService.deleteAllCart(userId, accessToken).subscribe(console.log)
    this.userService.getCart(accessToken).subscribe(console.log)
  }
  deleteOne(productId: string) {
    const userId: any = localStorage.getItem('userId')
    const accessToken: any = localStorage.getItem('accessToken')
    console.log(accessToken)
    this.userService.deleteOneCart(userId, productId, accessToken).subscribe(console.log)
  }

}
