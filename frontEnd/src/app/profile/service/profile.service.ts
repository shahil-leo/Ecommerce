import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  userId = localStorage.getItem('userId') as string

  getEveryWishlist() {
    return this.http.get(`http://localhost:4000/wishlist/get/${this.userId}`)
  }
  DeleteWishListOne(productId: string) {
    return this.http.delete(`http://localhost:4000/wishlist/delete/${this.userId}/${productId}`)
  }
  moveToCart(item: any, productId: string) {
    return this.http.post(`http://localhost:4000/cart/create/${this.userId}/${productId}`, { item: item },)
  }

  getEveryOrder() {
    return this.http.get(`http://localhost:4000/order/user/${this.userId}`)
  }
  deleteOrder(productId: string) {
    return this.http.delete(`http://localhost:4000/order/delete/${this.userId}/${productId}`)
  }
  getSingleUser() {
    return this.http.get(`http://localhost:4000/user/single/${this.userId}`)
  }
}
