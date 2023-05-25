import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  isTrue: boolean = false
  tru: boolean = false
  accessToken: any = localStorage.getItem('accessToken')
  userId: any = localStorage.getItem('userId')
  allCart: any[] = []
  allProduct: any[] = []
  length: number = 0
  allFeatures: any[] = []
  isProfile: boolean = false
  currentUser!: any



  ngOnInit(): void {
    this.oneProfile()
    this.everyCategory()
    this.gettingCart()
  }
  categories($event: Event) {
    this.tru = false
    this.isTrue = !this.isTrue
  }
  categoriesLeave($event: Event) {
    this.tru = true
    this.isTrue = !this.isTrue
  }

  everyCategory() {
    this.userService.allCategories(this.accessToken).subscribe({
      next: (res) => { this.allFeatures = res },
      error: (e) => { console.log(e) },
      complete: () => { }
    })
  }
  oneProfile() {
    this.userService.profileOne(this.userId).subscribe({
      next: (res) => { this.currentUser = res },
      error: (e) => { console.log(e) },
      complete: () => { }
    })
  }
  gettingCart() {
    this.userService.getCart(this.userId).subscribe({
      next: (res: any) => { this.allProduct = res.carts, this.length = this.allProduct.length },
      error: (e: Error) => { console.log(e) },
      complete: () => { }
    })
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
  }

}
