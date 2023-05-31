import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  isTrue: boolean = false
  product!: any
  ordersArray!: any
  singleOrder!: any
  productShow: boolean = false

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.everyFunction()
  }


  deleteOrder(productId: string) {
    const userId = localStorage.getItem('userId') as string
    this.adminService.deleteOneOrder(userId, productId).subscribe({
      next: (res) => { console.log(res) },
      error: (e: HttpErrorResponse) => { console.log(e.error) },
      complete: () => { this.everyFunction() }
    })
  }

  productsArray(id: string) {
    this.productShow = !this.productShow
    this.adminService.getOneOrder(id).subscribe({
      next: (res: any) => { this.singleOrder = res.orders[0].products, console.log(this.singleOrder) },
      error: (e) => { console.log(e) },
      complete: () => { console.log(this.singleOrder) }
    })
  }
  everyFunction() {
    this.adminService.getAllOrder().subscribe({
      next: (res) => { this.ordersArray = res },
      error: (e) => { console.log(e) },
      complete: () => { console.log('got all the product'), console.log(this.ordersArray) }
    })
  }

}
