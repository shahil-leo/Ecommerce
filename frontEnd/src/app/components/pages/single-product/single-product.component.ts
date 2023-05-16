import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  productId!: string
  singleProduct!: any

  constructor(
    private Router: ActivatedRoute,
    private userService: UserService
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

  cart(id: string) {
    console.log(id)
  }

}
