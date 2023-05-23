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
  accessToken = localStorage.getItem('accessToken')

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllOrder(this.accessToken).subscribe(console.log)
  }

  deleteProduct(productId: string) {
    console.log(productId)
    this.adminService.deleteOneProduct(productId, this.accessToken).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e) },
      complete: () => { console.log('deleted the Product') }
    })
  }







}
