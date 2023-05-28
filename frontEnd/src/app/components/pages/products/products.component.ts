import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private userService: UserService,
    private toaster: ToastrService
  ) {
    this.Router.params.subscribe({
      next: (res: Params) => {
        if (res['category']) {
          this.isCategory = true
          this.category = res['category']
          console.log(this.category)
        } else if (res['brand']) {
          this.category = res['brand']
          console.log(this.category)
        }
      }
    })
  }

  category!: string
  productsArray: any = []


  ngOnInit(): void {
    if (this.isCategory) {
      this.userService.findCategory(this.category).subscribe({
        next: (res) => { console.log(res), this.productsArray = res },
        error: (e: HttpErrorResponse) => { this.toaster.error(e.error) }
      })
    } else {
      this.userService.findBrand(this.category).subscribe(
        {
          next: (res) => { this.productsArray = res },
          error: (e: HttpErrorResponse) => { console.log(e.error) },
        })
    }
  }

}
