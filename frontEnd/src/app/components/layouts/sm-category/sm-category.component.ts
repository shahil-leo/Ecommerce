import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { cartItem } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-sm-category',
  templateUrl: './sm-category.component.html',
  styleUrls: ['./sm-category.component.scss']
})
export class SmCategoryComponent implements OnInit {

  productArray?: cartItem[] = []
  @Input() category?: string
  accessToken = localStorage.getItem('accessToken') as string
  userId = localStorage.getItem('userId') as string


  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.userService.findCategory(this.category).subscribe({
      next: (res) => {
        this.productArray = res
      },
      error: (e: HttpErrorResponse) => {
        this.toaster.error(e.error)
      }
    })
  }

  addToCart(item: cartItem, itemId: string): Subscription | Promise<boolean> {
    if (!(this.accessToken)) {
      return this.router.navigate(['/login'])
    }
    return this.userService.addCart(item, this.userId, itemId).subscribe({
      error: (e: HttpErrorResponse) => {
        this.toaster.error(e.error)
      },
      complete: () => {
        this.toaster.success('Added to cart ')
      }
    })
  }

  addToWishList(item: cartItem, itemId: string): Subscription {
    return this.userService.addWishList(item, this.userId, itemId).subscribe({
      error: (e: HttpErrorResponse) => {
        this.toaster.error(e.error)
      },
      complete: () => {
        this.toaster.success('Added to wishlist ')
      }
    })
  }

}
