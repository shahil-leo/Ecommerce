import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deleteOrder, deleteWishList, everyOrderProfile, everyWishList, getSingleUser, moveToCart } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  userId = localStorage.getItem('userId') as string

  getEveryWishlist() {
    return this.http.get(`${everyWishList}/${this.userId}`)
  }
  DeleteWishListOne(productId: string) {
    return this.http.delete(`${deleteWishList}/${this.userId}/${productId}`)
  }
  moveToCart(item: any, productId: string) {
    return this.http.post(`${moveToCart}/${this.userId}/${productId}`, { item: item },)
  }

  getEveryOrder() {
    return this.http.get(`${everyOrderProfile}/${this.userId}`)
  }
  deleteOrder(productId: string) {
    return this.http.delete(`${deleteOrder}/${this.userId}/${productId}`)
  }
  getSingleUser() {
    return this.http.get(`${getSingleUser}/${this.userId}`)
  }
}
