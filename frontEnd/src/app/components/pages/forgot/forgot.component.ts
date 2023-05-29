import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  hideOrShow: boolean = false
  form!: FormGroup
  email?: string
  code?: string

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      code: ['', [Validators.required]]
    })
  }
  get fc() {
    return this.form.controls
  }

  login() {
    this.code = this.fc['code'].value
    if (this.code) {
      console.log(this.code)
      console.log('shahil')
      return this.userService.checkCode(this.email as string, this.code as string).subscribe(console.log)
    } else {
      return 'nothing'
    }
  }


  forgotPass() {
    this.email = this.fc['email'].value
    if (this.email === null) {
      return this.toaster.error('no value in email')
    } else {
      this.hideOrShow = true
      return this.userService.forgotPass(this.email as string).subscribe({
        error: (e: HttpErrorResponse) => { this.toaster.error(e.error) }
      })
    }
  }

}
