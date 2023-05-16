import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  productsArray!: any

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.allProducts().subscribe({
      next: (res) => this.productsArray = res,
      complete: () => console.log(this.productsArray)
    })
  }

}
