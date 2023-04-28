import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { RegisterUser } from '../models/register-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(data: RegisterUser) {
    const { confirmPassword, ...others } = data
    return this.http.post('http://localhost:4000/user/register', others)
  }
}
