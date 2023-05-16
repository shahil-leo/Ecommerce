import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  productId!: string
  singleProduct!: any
  number = new BehaviorSubject(1)

  constructor(
    private Router: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.Router.params.subscribe({ next: (res) => { this.productId = res['id'] } })
  }

  ngOnInit(): void {
    this.userService.findSingleProduct(this.productId).subscribe({
      next: (res) => { this.singleProduct = res },
      error: (e) => { console.log(e) },
      complete: () => { console.log(this.singleProduct) }
    })
  }

  cart(productId: string) {
    const userId: any = localStorage.getItem('userId')
    const accessToken: any = localStorage.getItem('accessToken')
    this.userService.addCart(userId, productId, accessToken, this.number).subscribe({
      next: (res => { console.log(res) }),
      error: (e) => { console.log(e) },
      complete: () => { this.toastr.success('Product added succesfully ') }
    })
  }

}
