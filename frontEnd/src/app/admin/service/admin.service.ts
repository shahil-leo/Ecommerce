import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getTotalUser() {
    return this.http.get('http://localhost:4000/user/allUser')
  }
  getTotalProducts() {
    return this.http.get('http://localhost:4000/product/all')
  }
  getTotalOrders() {
    return this.http.get('http://localhost:4000/order/all')
  }
  getSomeOrders() {
    return this.http.get('http://localhost:4000/order/allSome')
  }
  getSomeCategory() {
    return this.http.get('http://localhost:4000/category/everySome')
  }
  getAllCategory() {
    return this.http.get('http://localhost:4000/category/every',)
  }
  getAllProduct() {
    return this.http.get('http://localhost:4000/product/all')
  }
  deleteOneProduct(productId: string) {
    return this.http.delete(`http://localhost:4000/product/delete/${productId}`)
  }
  addOneProduct(formValue: any) {
    return this.http.post(`http://localhost:4000/product/create`, formValue)
  }
  addOneCategory(CategoryData: any) {
    return this.http.post('http://localhost:4000/category/add', CategoryData,)
  }
  deleteOneCategory(productId: string) {
    return this.http.delete(`http://localhost:4000/category/delete/${productId}`,)
  }
  getOneCategory(productId: string) {
    return this.http.get(`http://localhost:4000/category/single/${productId}`,)
  }
  updateOneCategory(productId: string, Data: any) {
    return this.http.put(`http://localhost:4000/category/update/${productId}`, { Data },)
  }
  getAllOrder() {
    return this.http.get('http://localhost:4000/order/all')
  }
  getAllUsers() {
    return this.http.get('http://localhost:4000/user/allUser')
  }
  deleteOneUser(userId: string) {
    return this.http.delete(`http://localhost:4000/user/delete/${userId}`)
  }
  getOneOrder(id: string) {
    return this.http.get(`http://localhost:4000/order/oneProduct/${id}`)
  }
  getOneProductEdit(id: string) {
    return this.http.get(`http://localhost:4000/product/singleProduct/${id}`)
  }
  updateOneProduct(id: string, formData: any) {
    return this.http.put(`http://localhost:4000/product/update/${id}`, formData)
  }
}
