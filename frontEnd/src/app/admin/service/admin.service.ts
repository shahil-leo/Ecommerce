import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryFullRes, CategoryResponse, cartItem, fullOrderRes, loginUserToken } from 'src/app/shared/interfaces/allinterfaceApp';
import { addOneCategory, addOneProductAdmin, allCategoryAdmin, authToken, deleteOneCategory, deleteOneOrder, deleteOneProduct, deleteOneUser, everyOrder, getAllOrder, getAllProductAdmin, getAllUser, getOneCategory, getOneOrder, getOneProductEdit, someCategory, someOrders, totalProducts, totalUser, updateOneProduct, updateStatus } from './../../shared/constants/urls';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  singleUser!: any

  constructor(private http: HttpClient) { }

  // getTotalUser
  getTotalUser(): Observable<loginUserToken[]> {
    return this.http.get<loginUserToken[]>(`${totalUser}`)
  }

  // getTotalProducts
  getTotalProducts(): Observable<cartItem[]> {
    return this.http.get<cartItem[]>(`${totalProducts}`)
  }
  // getTotalOrders
  getTotalOrders(): Observable<fullOrderRes[]> {
    return this.http.get<fullOrderRes[]>(`${everyOrder}`)
  }

  // getSomeOrders
  getSomeOrders(): Observable<fullOrderRes[]> {
    return this.http.get<fullOrderRes[]>(`${someOrders}`)
  }

  // getSomeCategory
  getSomeCategory(): Observable<CategoryFullRes[]> {
    return this.http.get<CategoryFullRes[]>(`${someCategory}`)
  }

  // getAllCategory
  getAllCategory(): Observable<CategoryFullRes[]> {
    return this.http.get<CategoryFullRes[]>(`${allCategoryAdmin}`)
  }

  // getAllProducts
  getAllProduct() {
    return this.http.get(`${getAllProductAdmin}`)
  }

  // deleteOneProduct
  deleteOneProduct(productId: string) {
    return this.http.delete(`${deleteOneProduct}/${productId}`)
  }

  // addOneProduct
  addOneProduct(formValue: any) {
    return this.http.post(`${addOneProductAdmin}`, formValue)
  }

  // addOneCategory
  addOneCategory(CategoryData: FormData): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${addOneCategory}`, CategoryData,)
  }

  // deleteOneCategory
  deleteOneCategory(productId: string): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>(`${deleteOneCategory}/${productId}`,)
  }

  // getOneCategory
  getOneCategory(productId: string) {
    return this.http.get(`${getOneCategory}/${productId}`,)
  }

  // updateOneCategory
  updateOneCategory(productId: string, Data: any) {
    return this.http.put(`/${productId}`, { Data },)
  }

  // getAllOrder
  getAllOrder(): Observable<fullOrderRes[]> {
    return this.http.get<fullOrderRes[]>(`${getAllOrder}`)
  }

  // getAllUsers
  getAllUsers() {
    return this.http.get(`${getAllUser}`)
  }

  // deleteOneUser
  deleteOneUser(userId: string) {
    return this.http.delete(`${deleteOneUser}/${userId}`)
  }

  // getOneOrder
  getOneOrder(id: string) {
    return this.http.get(`${getOneOrder}/${id}`)
  }

  // EditOneProduct
  getOneProductEdit(id: string) {
    return this.http.get(`${getOneProductEdit}/${id}`)
  }

  // updateOneProduct
  updateOneProduct(id: string, formData: any) {
    return this.http.put(`${updateOneProduct}/${id}`, formData)
  }

  // deleteOneOrder
  deleteOneOrder(userId: string, productId: string) {
    return this.http.delete(`${deleteOneOrder}/${userId}/${productId}`)
  }

  // updating status
  updateStatus(userId: string, orderId: string) {
    const data = 'success'
    return this.http.put(`${updateStatus}/${userId}/${orderId}`, { data })
  }

  isAdmin(): Promise<boolean> {
    const token = localStorage.getItem('token') as string;

    return new Promise<boolean>((resolve, reject) => {
      this.http.get(`${authToken}`).subscribe({
        next: (res: any) => {
          resolve(res.isAdmin === true);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }
}
