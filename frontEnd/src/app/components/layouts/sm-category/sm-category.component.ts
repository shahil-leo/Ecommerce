import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sm-category',
  templateUrl: './sm-category.component.html',
  styleUrls: ['./sm-category.component.scss']
})
export class SmCategoryComponent implements OnInit {

  productArray: any = []
  @Input() category?: string

  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) { }
  ngOnInit(): void {
    this.userService.findCategory(this.category).subscribe({ next: (res) => { this.productArray = res } })
  }

  addToCart(item: any, itemId: string) {
    const userId: any = localStorage.getItem('userId')
    this.userService.addCart(item, userId, itemId).subscribe({
      next(value) {
        console.log(value)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        this.toaster.success('Added to cart ')
      }
    })
  }

  addToWishList(item: any, itemId: string) {
    const userId: any = localStorage.getItem('userId')
    this.userService.addWishList(item, userId, itemId).subscribe({
      next(value) {
        console.log(value)
      },
      error: (e) => {
        this.toaster.error(e.error)
      },
      complete: () => {
        this.toaster.success('Added to wishlist ')
      }
    })
  }

}
