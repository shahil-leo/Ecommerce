import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { cartFullResponse, wishlistFullResponse } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-sm-category',
  templateUrl: './sm-category.component.html',
  styleUrls: ['./sm-category.component.scss']
})
export class SmCategoryComponent implements OnInit {

  productArray: any = []
  @Input() category?: string
  accessToken = localStorage.getItem('accessToken') as string
  userId = localStorage.getItem('userId') as string


  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.userService.findCategory(this.category).subscribe(
      (res: Object) => {
        console.log(res)
        this.productArray = res;
      }
    )
  }

  addToCart(item: cartFullResponse, itemId: string): Subscription | Promise<boolean> {
    if (!(this.accessToken)) {
      return this.router.navigate(['/login'])
    }
    return this.userService.addCart(item, this.userId, itemId).subscribe({
      error: (e: Error) => {
        this.toaster.error(e.message)
      },
      complete: () => {
        this.toaster.success('Added to cart ')
      }
    })
  }

  addToWishList(item: wishlistFullResponse, itemId: string): Subscription {
    return this.userService.addWishList(item, this.userId, itemId).subscribe({
      error: (e: Error) => {
        this.toaster.error(e.message)
      },
      complete: () => {
        this.toaster.success('Added to wishlist ')
      }
    })
  }

}
