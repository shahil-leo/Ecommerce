import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isCategory!: boolean

  constructor(
    private Router: ActivatedRoute,
    private userService: UserService
  ) {
    this.Router.params.subscribe({
      next: (res) => {
        console.log(res)
        if (res['category']) {
          this.isCategory = true
          this.category = res['category']
        } else if (res['brand']) {
          this.category = res['brand']
        }
      }
    })
  }

  category!: any
  productsArray: any


  ngOnInit(): void {
    if (this.isCategory) {
      this.userService.findCategory(this.category).subscribe({
        next: (res: any) => { this.productsArray = res },
        error: (e) => { console.log(e) },
        complete: () => { console.log('success cateogry') }
      })

    } else {
      this.userService.findBrand(this.category).subscribe(
        {
          next: (res) => { this.productsArray = res },
          error: (e) => { console.log(e) },
          complete: () => { console.log('brand completed') }
        })
    }
  }

}
