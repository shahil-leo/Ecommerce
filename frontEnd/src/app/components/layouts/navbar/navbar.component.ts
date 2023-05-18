import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private userService: UserService) { }

  isTrue: boolean = false
  tru: boolean = false
  accessToken: any = localStorage.getItem('accessToken')
  userId: any = localStorage.getItem('userId')
  allCart: any[] = []
  allProduct: any[] = []
  length: number = 0
  allFeatures: any[] = []

  showCat() {
    this.isTrue = !this.isTrue
  }
  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken')
    this.userService.allCategories(accessToken).subscribe({ next: (res) => { this.allFeatures = res } })
    this.userService.getCart(this.accessToken, this.userId).subscribe({
      next: (res: any) => {
        this.allCart = res[0].products
        for (const products of this.allCart) {
          this.userService.findSingleProduct(products.productId).subscribe({
            next: (res) => {
              this.allProduct.push(res)
              this.userService.length.next(this.allProduct.length)
              this.userService.length.subscribe((res) => { this.length = res })
            }
          })
        }
      },
      error: (e: Error) => { console.log(e) },
      complete: () => { console.log('finished') }
    })
  }
  categories($event: Event) {
    this.tru = !this.tru
  }

  allCategory() {

  }

}
