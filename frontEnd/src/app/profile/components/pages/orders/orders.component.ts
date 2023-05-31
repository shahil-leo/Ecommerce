import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { concat, of } from 'rxjs';
import { ProfileService } from 'src/app/profile/service/profile.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  allOrderList: any = []
  newArray: any = []
  status?: string

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getAllCart()
  }

  getAllCart() {
    this.profileService.getEveryOrder().subscribe({
      next: (res: any) => {
        this.allOrderList = res;
        const allProducts$: any[] = [];

        this.allOrderList.forEach((order: any) => {
          this.status = order.status
          const products$ = order.orders[0].products.map((product: any) => of(product));
          allProducts$.push(...products$);
        });
        concat(...allProducts$).subscribe((product: any) => {
          this.newArray.push(product)
        });
      }
    });
  }

  deleteOrder(productId: string) {
    console.log(productId)
    this.profileService.deleteOrder(productId).subscribe({
      next: (res) => { console.log(res) },
      error: (e: HttpErrorResponse) => { console.log(e.error) },
      complete: () => { this.getAllCart }
    })
  }
}
