import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  totalUserCount!: any
  totalProductsCount!: any
  totalOrders!: any
  orders!: []
  ordersShow!: any[]
  totalAmount!: any
  category!: any[]
  accessToken = localStorage.getItem('accessToken')

  ngOnInit(): void {
    this.adminService.getTotalUser(this.accessToken).subscribe({
      next: (res: any) => { this.totalUserCount = res.length },
      error: (e) => { console.log(e) },
      complete: () => { 'sucessfully' }
    })
    this.adminService.getTotalProducts(this.accessToken).subscribe({
      next: (res: any) => { this.totalProductsCount = res.length },
      error: (e) => { console.log(e) },
      complete: () => { 'sucessfully' }
    })
    this.adminService.getTotalOrders(this.accessToken).subscribe({
      next: (res: any) => {
        this.totalOrders = res.length, this.orders = res,
          this.totalAmount = this.orders.reduce((acc, order: any) => acc + order.amount, 0);
      },
      error: (e) => { console.log(e) },
      complete: () => { 'sucessfully' }
    })
    this.adminService.getSomeOrders(this.accessToken).subscribe({
      next: (res: any) => {
        this.ordersShow = res
      },
      error: (e) => { console.log(e) },
      complete: () => { 'sucessfully' }
    })
    this.adminService.getSomeCategory(this.accessToken).subscribe({
      next: (res: any) => {
        this.category = res
      },
      error: (e) => { console.log(e) },
      complete: () => { 'sucessfully' }
    })
  }

}
