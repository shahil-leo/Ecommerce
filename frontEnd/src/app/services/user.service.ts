import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Login, LoginData, RegisterUser } from '../models/register-user';
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

  registerUser(data: RegisterUser): Observable<RegisterUser> {
    const { confirmPassword, ...others } = data
    return this.http.post<RegisterUser>('http://localhost:4000/auth/register', others)
  }
  loginUser(Data: LoginData): Observable<Login> {
    return this.http.post<Login>('http://localhost:4000/auth/login', Data)
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
  addCart(item: any, userId: string, accessToken: string, productId: string) {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.post(`http://localhost:4000/cart/create/${userId}/${productId}`, { item: item }, { headers: headers })
  }
  getCart(accessToken: any, userId: string) {
    console.log(accessToken, userId)
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.get(`http://localhost:4000/cart/getCart/${userId}`, { headers: headers })
  }
  deleteAllCart(userId: string, accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.delete(`http://localhost:4000/cart/deleteAll/${userId}`, { headers: headers })
  }
  deleteOneCart(userId: string, productId: string, accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.delete(`http://localhost:4000/cart/delete/${userId}/${productId}`, { headers: headers })
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
  updatedQuantity(productId: string, userId: any, number: number, accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.post(`http://localhost:4000/cart/updateNumber/${userId}/${productId}`,
      { number: number }, { headers })
  }

  profileOne(id: string, accessToken: any): Observable<any> {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.get(`http://localhost:4000/profile/get/${id}`, { headers })
  }

  stripe(userId: string, accessToken: any, productArray: any) {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.post(`http://localhost:4000/order/stripe/${userId}`, { productArray: productArray }, { headers })
  }

  addOrder(userId: string, accessToken: any, formValue: any, productArray: any, totalAmount: any) {
    console.log(productArray)
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.post(`http://localhost:4000/order/create/${userId}`, { orders: formValue, products: productArray, amount: totalAmount }, { headers: headers })
  }
}
