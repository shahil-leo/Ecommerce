import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  acessToken: any = localStorage.getItem('accessToken')

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  isTrue: boolean = false
  accessToken: any = localStorage.getItem('accessToken')
  userId: any = localStorage.getItem('userId')
  allCart: any[] = []
  allProduct: any[] = []
  length: number = 0
  allFeatures: any[] = []
  isProfile: boolean = false
  currentUser!: any
  brandsRes: [] = []
  brandsArray: string[] = []
  uniqueBrand: string[] = []
  isCategoryOpen: boolean = false;
  isBrandOpen: boolean = false;

  ngOnInit(): void {
    this.oneProfile()
    this.everyCategory()
    this.gettingCart()
    this.getAllBrand()
  }


  everyCategory() {
    this.userService.allCategories().subscribe({
      next: (res) => { this.allFeatures = res },
      error: (e) => { console.log(e) },
      complete: () => { }
    })
  }
  oneProfile() {
    if (!(this.accessToken)) {
      return 'no user is here'
    }
    return this.userService.profileOne(this.userId).subscribe({
      next: (res) => { this.currentUser = res },
      error: (e) => { console.log(e) },
      complete: () => { }
    })
  }
  gettingCart() {
    if (!(this.accessToken)) {
      return 'no user is here'
    }
    return this.userService.getCart(this.userId).subscribe({
      next: (res: any) => { this.allProduct = res.carts, this.length = this.allProduct.length },
      error: (e: Error) => { console.log(e) },
      complete: () => { }
    })
  }
  getAllBrand() {
    this.userService.getAllBrand().subscribe({
      next: (res: any) => {
        this.brandsRes = res
        this.brandsRes.map((element: any) => {
          this.brandsArray.push(element.brand)
          this.uniqueBrand = [...new Set(this.brandsArray)]
        })
      }, error: (e) => { console.log(e) },
      complete: () => { }
    })
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
  }

  showHideCategory(show: boolean): void {
    this.isCategoryOpen = show;
  }
  showHideBrand(show: boolean): void {
    this.isBrandOpen = show;
  }


}
