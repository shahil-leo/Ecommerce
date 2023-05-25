import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  addOneCategory(accessToken: any, CategoryData: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.post('http://localhost:4000/category/add', { CategoryData }, { headers })
  }
  deleteOneCategory(accessToken: any, productId: string) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.delete(`http://localhost:4000/category/delete/${productId}`, { headers })
  }
  getOneCategory(accessToken: any, productId: string) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get(`http://localhost:4000/category/single/${productId}`, { headers })
  }
  updateOneCategory(accessToken: any, productId: string, Data: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.put(`http://localhost:4000/category/update/${productId}`, { Data }, { headers })
  }
  getAllOrder(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/order/all', { headers })
  }
  getAllUsers(accessToken: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get('http://localhost:4000/user/allUser', { headers })
  }
  deleteOneUser(accessToken: any, userId: string) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.delete(`http://localhost:4000/user/delete/${userId}`, { headers })
  }
  getOneOrder(accessToken: any, id: string) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get(`http://localhost:4000/order/oneProduct/${id}`, { headers })
  }
  getOneProductEdit(accessToken: any, id: string) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.get(`http://localhost:4000/product/singleProduct/${id}`, { headers })
  }
  updateOneProduct(accessToken: any, id: string, formData: any) {
    const headers = new HttpHeaders({ token: accessToken })
    return this.http.put(`http://localhost:4000/product/update/${id}`, { formData }, { headers })
  }
}
