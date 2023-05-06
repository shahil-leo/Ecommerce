import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private Router: ActivatedRoute,
    private userService: UserService
  ) {
    this.Router.params.subscribe({ next: (res) => { this.category = res } })
  }

  category!: any
  productsArray: any


  ngOnInit(): void {
    if (this.category['category']) {
      this.userService.findCategory(this.category['category']).subscribe({
        next: (res: any) => { this.productsArray = res, console.log(this.productsArray) },
        error: (e) => { console.log(e) },
        complete: () => { console.log('success') }
      })

    } else {
      this.userService.findBrand(this.category['brand']).subscribe(
        {
          next: (res) => { this.productsArray = res },
          error: (e) => { console.log(e) },
          complete: () => { console.log('completed') }
        })
    }

  }

}
