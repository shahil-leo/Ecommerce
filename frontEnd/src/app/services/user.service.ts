import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Login, RegisterUser } from '../models/register-user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(data: RegisterUser): Observable<RegisterUser> {
    const { confirmPassword, ...others } = data
    return this.http.post<RegisterUser>('http://localhost:4000/auth/register', others)
  }
  loginUser(Data: any): Observable<Login> {
    return this.http.post<Login>('http://localhost:4000/auth/login', Data)
  }
}
