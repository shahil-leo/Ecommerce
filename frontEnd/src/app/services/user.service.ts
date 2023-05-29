import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { addCart, addOrder, addWishList, allCategories, allCategory, allProducts, checkCode, deleteAllCart, deleteAllWishList, deleteOneCart, deleteOneWishList, findBrand, findCategory, findSingleProduct, forgotPass, getAllBrand, getCart, getWishlist, login, profileOne, register, stripe, updatedQuantity } from '../shared/constants/urls';
import { cartFullResponse, loginData, registerUser } from '../shared/interfaces/allinterfaceApp';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http: HttpClient,
    private toaster: ToastrService
  ) { }
  number: BehaviorSubject<number> = new BehaviorSubject(1)
  length: BehaviorSubject<number> = new BehaviorSubject(0)
  cartLength: Subject<number> = new Subject()
  accessToken: any = localStorage.getItem('accessToken')
  userId: any = localStorage.getItem('userId')
  num!: number


  // user authentication
  registerUser(data: registerUser): any {
    const { confirmPassword, ...others } = data
    return this.http.post(`${register}`, others)
  }
  loginUser(Data: loginData): any {
    return this.http.post(`${login}`, Data)
  }

  // category getting
  allCategory(): Observable<Object> {
    return this.http.get(`${allCategory}`)
  }
  allCategories(): Observable<Object> {
    return this.http.get(`${allCategories}`)
  }
  findCategory(category: string | undefined): Observable<object> {

    return this.http.get(`${findCategory}/${category}`)
  }

  // brand CRUD
  getAllBrand() {
    return this.http.get(`${getAllBrand}`)
  }
  findBrand(brand: string) {
    return this.http.get(`${findBrand}/${brand}`)
  }
  findSingleProduct(id: string) {
    return this.http.get(`${findSingleProduct}/${id}`)
  }

  // products CRUD
  allProducts() {
    return this.http.get(`${allProducts}`)
  }

  // cart CRUD operations

  addCart(item: any, userId: string, productId: string) {
    return this.http.post(`${addCart}/${userId}/${productId}`, { item: item },)
  }
  deleteAllCart(userId: string) {
    return this.http.delete(`${deleteAllCart}/${userId}`)
  }
  deleteOneCart(userId: string, productId: string) {
    return this.http.delete(`${deleteOneCart}/${userId}/${productId}`)
  }
  getCart(userId: string) {
    return this.http.get<cartFullResponse>(`${getCart}/${userId}`)
  }

  // wishlist CRUD  operations
  addWishList(item: any, userId: string, productId: string) {
    return this.http.post(`${addWishList}/${userId}/${productId}`, { item: item })
  }
  getWishlist(userId: string) {
    return this.http.get(`${getWishlist}/${userId}`)
  }

  deleteAllWishList(userId: string) {
    return this.http.delete(`${deleteAllWishList}/${userId}`)
  }
  deleteOneWishList(userId: string, productId: string) {
    return this.http.delete(`${deleteOneWishList}/${userId}/${productId}`)
  }

  // decrease and increase quantity using the observables
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

  // updating quantity of the products in cart using the method

  updatedQuantity(productId: string, userId: string, number: number) {
    return this.http.post(`${updatedQuantity}/${userId}/${productId}`,
      { number: number })
  }

  // getting one profile from the logged user using he userId
  profileOne(id: string): Observable<any> {
    return this.http.get(`${profileOne}/${id}`)
  }

  // payment method using the stripe method
  stripe(userId: string, productArray: any) {
    return this.http.post(`${stripe}/${userId}`, { productArray: productArray })
  }

  // when the payment is successfully then order is processing
  addOrder(userId: string, formValue: any, productArray: any, totalAmount: any) {
    return this.http.post(`${addOrder}/${userId}`, { orders: formValue, products: productArray, amount: totalAmount })
  }
  forgotPass(email: string) {
    return this.http.post(`${forgotPass}`, { email })
  }
  checkCode(email: string, code: string) {
    return this.http.post(`${checkCode}`, { email, code })
  }


}
