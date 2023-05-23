import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }



  getTotalUser(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/user/allUser', { headers })
  }
  getTotalProducts(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/product/all', { headers })
  }
  getTotalOrders(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/order/all', { headers })
  }
  getSomeOrders(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/order/allSome', { headers })
  }
  getSomeCategory(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/category/everySome', { headers })
  }
  getAllCategory(accessToken: any) {
    console.log(accessToken)
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/category/every', { headers })
  }
  getAllProduct(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/product/all', { headers })
  }
  deleteOneProduct(productId: string, accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.delete(`http://localhost:4000/product/delete/${productId}`, { headers })
  }
  addOneProduct(accessToken: any, formValue: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.post(`http://localhost:4000/product/create`, { formValue }, { headers })
  }


}
