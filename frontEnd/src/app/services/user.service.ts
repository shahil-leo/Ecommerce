import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { addCart, addOrder, addWishList, allCategories, allCategory, allProducts, checkCode, deleteAllCart, deleteOneCart, findBrand, findCategory, findSingleProduct, forgotPass, getAllBrand, getCart, login, profileOne, register, stripe, updatedQuantity } from '../shared/constants/urls';
import { CategoryFullRes, CategoryResponse, addWishlist, address, brand, cartFullResponse, cartItem, fullOrderRes, fullUserRes, loginData, loginUserToken, registerUser, singleProduct } from '../shared/interfaces/allinterfaceApp';
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
  accessToken = localStorage.getItem('accessToken') as string
  userId = localStorage.getItem('userId') as string
  num!: number


  // registering a user
  registerUser(data: registerUser): Observable<fullUserRes> {
    const { confirmPassword, ...others } = data
    return this.http.post<fullUserRes>(`${register}`, others)
  }

  // loginUser
  loginUser(Data: loginData): Observable<loginUserToken> {
    return this.http.post<loginUserToken>(`${login}`, Data)
  }

  // category getting
  allCategory(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${allCategory}`)
  }

  // allCategories
  allCategories(): Observable<CategoryFullRes[]> {
    return this.http.get<CategoryFullRes[]>(`${allCategories}`)
  }

  // findCategory
  findCategory(category: string | undefined): Observable<cartItem[]> {
    return this.http.get<cartItem[]>(`${findCategory}/${category}`)
  }

  // brand CRUD
  getAllBrand(): Observable<brand[]> {
    return this.http.get<brand[]>(`${getAllBrand}`)
  }

  // findBrand
  findBrand(brand: string): Observable<brand> {
    return this.http.get<brand>(`${findBrand}/${brand}`)
  }

  // findSingleProduct
  findSingleProduct(id: string): Observable<singleProduct> {
    return this.http.get<singleProduct>(`${findSingleProduct}/${id}`)
  }

  // products CRUD
  allProducts(): Observable<cartItem[]> {
    return this.http.get<cartItem[]>(`${allProducts}`)
  }

  // cart CRUD operations
  addCart(item: any, userId: string, productId: string): Observable<typeof addCart> {
    return this.http.post<typeof addCart>(`${addCart}/${userId}/${productId}`, { item: item },)
  }

  // deleteAllCart
  deleteAllCart(userId: string): Observable<void> {
    return this.http.delete<void>(`${deleteAllCart}/${userId}`)
  }

  // deleteOneCart
  deleteOneCart(userId: string, productId: string): Observable<void> {
    return this.http.delete<void>(`${deleteOneCart}/${userId}/${productId}`)
  }

  // getOneCart
  getCart(userId: string): Observable<cartFullResponse> {
    return this.http.get<cartFullResponse>(`${getCart}/${userId}`)
  }

  // wishlist CRUD  operations
  addWishList(item: any, userId: string, productId: string): Observable<addWishlist> {
    return this.http.post<addWishlist>(`${addWishList}/${userId}/${productId}`, { item: item })
  }

  // decrease and increase quantity using the observables
  addQuantity(): void {
    this.number.subscribe((res) => {
      this.num = res
    })
    this.number.next(this.num + 1)
  }

  minusQuantity(): void {
    this.number.subscribe((res) => {
      this.num = res
    })
    if (this.num > 1) {
      this.number.next(this.num - 1)
    }
  }

  // updating quantity of the products in cart using the method
  updatedQuantity(productId: string, userId: string, number: number): Observable<void> {
    return this.http.post<void>(`${updatedQuantity}/${userId}/${productId}`,
      { number: number })
  }

  // getting one profile from the logged user using he userId
  profileOne(id: string): Observable<fullUserRes> {
    return this.http.get<fullUserRes>(`${profileOne}/${id}`)
  }

  // payment method using the stripe method
  stripe(userId: string, productArray: any) {
    return this.http.post(`${stripe}/${userId}`, { productArray: productArray })
  }

  // when the payment is successfully then order is processing
  addOrder(userId: string, formValue: address, productArray: cartItem[], totalAmount: number): Observable<fullOrderRes> {
    return this.http.post<fullOrderRes>(`${addOrder}/${userId}`, { orders: formValue, products: productArray, amount: totalAmount })
  }

  // forgotPass
  forgotPass(email: string): Observable<void> {
    return this.http.post<void>(`${forgotPass}`, { email })
  }

  // checkCode
  checkCode(email: string, code: string): Observable<void> {
    return this.http.post<void>(`${checkCode}`, { email, code })
  }

  //searching through products
  searchProduct(searchKey: string): Observable<cartItem[]> {
    return this.http.get<cartItem[]>(`http://localhost:4000/product/search/${searchKey}`)
  }

}
