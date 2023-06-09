import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { CategoryFullRes, fullOrderRes } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private toaster: ToastrService
  ) { }

  totalUserCount?: number
  totalProductsCount!: number
  totalOrders!: number
  orders!: fullOrderRes[]
  ordersShow!: fullOrderRes[]
  totalAmount!: number
  category!: CategoryFullRes[]
  accessToken = localStorage.getItem('accessToken') as string

  ngOnInit(): void {
    this.adminService.getTotalUser().subscribe({
      next: (res) => this.totalUserCount = res.length,
    })

    this.adminService.getTotalProducts().subscribe({
      next: (res) => this.totalProductsCount = res.length,
      error: (error: HttpErrorResponse) => this.toaster.error(error.error)
    })

    this.adminService.getTotalOrders().subscribe({
      next: (res) => {
        this.totalOrders = res.length, this.orders = res,
          this.totalAmount = this.orders.reduce((acc, order: any) => acc + order.amount, 0);
      },
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })

    this.adminService.getSomeOrders().subscribe({
      next: (res) => this.ordersShow = res,
      error: (e: HttpErrorResponse) => e.error,
    })

    this.adminService.getSomeCategory().subscribe({
      next: (res) => this.category = res,
      error: (e: HttpErrorResponse) => this.toaster.error(e.error),
    })
  }

}
