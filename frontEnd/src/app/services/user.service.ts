import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) { }
  number: BehaviorSubject<number> = new BehaviorSubject(1)
  length: BehaviorSubject<number> = new BehaviorSubject(0)
  accessToken: any = localStorage.getItem('accessToken')
  userId: any = localStorage.getItem('userId')
  num!: number

  registerUser(data: any): any {
    const { confirmPassword, ...others } = data
    return this.http.post('http://localhost:4000/auth/register', others)
  }
  loginUser(Data: any): any {
    return this.http.post('http://localhost:4000/auth/login', Data)
  }
  allCategory(): Observable<any> {
    return this.http.get('http://localhost:4000/product/Allcategory')
  }
  allCategories(token: any): Observable<any> {
    const headers = new HttpHeaders({ token: token });
    return this.http.get('http://localhost:4000/category/every', { headers })
  }
  findCategory(category: string | undefined) {
    return this.http.get(`http://localhost:4000/product/findCategory/${category}`)
  }
  getAllBrand() {
    return this.http.get('http://localhost:4000/product/findBrand')
  }
  findBrand(brand: string) {
    return this.http.get(`http://localhost:4000/product/findBrandProduct/${brand}`)
  }
  findSingleProduct(id: string) {
    return this.http.get(`http://localhost:4000/product/single/${id}`)
  }
  allProducts() {
    return this.http.get('http://localhost:4000/product/all')
  }
  addCart(item: any, userId: string, productId: string) {
    return this.http.post(`http://localhost:4000/cart/create/${userId}/${productId}`, { item: item },)
  }
  addWishList(item: any, userId: string, productId: string) {
    return this.http.post(`http://localhost:4000/wishlist/create/${userId}/${productId}`, { item: item })
  }
  getCart(userId: string) {
    return this.http.get(`http://localhost:4000/cart/getCart/${userId}`)
  }
  getWishlist(userId: string) {
    return this.http.get(`http://localhost:4000/wishlist/get/${userId}`)
  }
  deleteAllCart(userId: string) {
    return this.http.delete(`http://localhost:4000/cart/deleteAll/${userId}`)
  }
  deleteOneCart(userId: string, productId: string) {
    return this.http.delete(`http://localhost:4000/cart/delete/${userId}/${productId}`)
  }
  deleteAllWishList(userId: string) {
    return this.http.delete(`http://localhost:4000/wishlist/deleteAll/${userId}`)
  }
  deleteOneWishList(userId: string, productId: string) {
    return this.http.delete(`http://localhost:4000/wishlist/delete/${userId}/${productId}`)
  }
  addQuantity() {
    this.number.subscribe((res) => {
      this.num = res
    })
    this.number.next(this.num + 1)
  }
  minusQuantity() {
    this.number.subscribe((res) => {
      this.num = res
    })
    if (this.num > 1) {
      this.number.next(this.num - 1)
    }
  }
  updatedQuantity(productId: string, userId: any, number: number) {
    return this.http.post(`http://localhost:4000/cart/updateNumber/${userId}/${productId}`,
      { number: number })
  }

  profileOne(id: string): Observable<any> {
    return this.http.get(`http://localhost:4000/profile/get/${id}`)
  }

  stripe(userId: string, productArray: any) {
    return this.http.post(`http://localhost:4000/order/stripe/${userId}`, { productArray: productArray })
  }

  addOrder(userId: string, formValue: any, productArray: any, totalAmount: any) {
    return this.http.post(`http://localhost:4000/order/create/${userId}`, { orders: formValue, products: productArray, amount: totalAmount })
  }
}
