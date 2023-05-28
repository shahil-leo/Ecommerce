import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { cartItem } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  userId = localStorage.getItem('userId') as string

  productId!: string
  singleProduct!: any
  universal!: Observable<number>
  number: number = 10
  constructor(
    private Router: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.Router.params.subscribe({ next: (res) => { this.productId = res['id'] } })
  }

  ngOnInit(): void {
    this.universal = this.userService.number
    this.userService.findSingleProduct(this.productId).subscribe({
      next: (res: any) => { this.singleProduct = res },
      error: (e: HttpErrorResponse) => { this.toastr.error(e.error) },
      complete: () => { console.log(this.singleProduct) }
    })
  }

  cart(product: cartItem) {
    this.universal.subscribe(res => { this.number = res })
    console.log(product._id)
    this.userService.addCart(product, this.userId, this.productId).subscribe({
      next: (res => { console.log(res) }),
      error: (e) => { console.log(e) },
      complete: () => {
        this.userService.updatedQuantity(this.productId, this.userId, this.number).subscribe(() => {
        })
        this.toastr.success('Product added succesfully ')
      }
    })
  }
  add(): void {
    this.userService.addQuantity()
  }
  minus(): void {
    this.userService.minusQuantity()
  }

}
