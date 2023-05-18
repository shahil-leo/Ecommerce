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
    console.log(id)
    return this.http.get(`http://localhost:4000/product/single/${id}`)
  }
  allProducts() {
    return this.http.get('http://localhost:4000/product/all')
  }
  addCart(userId: string, productId: string, accessToken: string, number: number) {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.post(`http://localhost:4000/cart/create/${userId}/${productId}`, { Number: number }, { headers: headers })
  }
  getCart(accessToken: any, id: string) {
    const headers = new HttpHeaders({ token: accessToken });
    return this.http.get(`http://localhost:4000/cart/getCart/${id}`, { headers: headers })
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
    return this.http.post(`http://localhost:4000/product/updatedQuantity/${userId}/${productId}`,
      { Number: number }, { headers })
  }
}
