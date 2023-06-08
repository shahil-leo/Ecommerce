import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { loginData } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {


  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required]]
    })
  }
  get fc() {
    return this.form.controls
  }

  login(Data: loginData) {
    this.userService.loginUser(Data).subscribe(
      {
        next: (res) => {
          localStorage.setItem('accessToken', res.accessToken)
          localStorage.setItem('userId', res._id)
        },
        error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
        complete: () => { this.toaster.success('Logged in successfully'), this.router.navigate(['/admin']) }
      },
    )
  }
}
