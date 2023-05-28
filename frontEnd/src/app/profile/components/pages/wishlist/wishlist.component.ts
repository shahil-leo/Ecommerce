import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile/service/profile.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  allWishList!: any

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getWishList()
  }

  deleteOneWishList(productId: string) {
    this.profileService.DeleteWishListOne(productId).subscribe({
      next: (res) => { this.getWishList() }
    })
  }
  getWishList() {
    this.profileService.getEveryWishlist().subscribe({
      next: (res: any) => { console.log(res), this.allWishList = res.wishList, console.log(this.allWishList) }
    })
  }
  moveToCart(product: any, productId: string) {
    this.profileService.moveToCart(product, productId).subscribe({
      next: (res) => { this.getWishList() },
      complete: () => { this.deleteOneWishList(productId) }
    })
  }

}
