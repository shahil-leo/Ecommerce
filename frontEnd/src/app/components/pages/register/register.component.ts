import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { registerUser } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }
  get fc() {
    return this.form.controls
  }
  formSubmit(formData: registerUser): Subscription | any {
    if (!(formData.password === formData.confirmPassword)) return this.toaster.error('Password is not same')
    return this.userService.registerUser(formData).subscribe({
      error: (e: HttpErrorResponse) => this.toaster.error(e.error),
      complete: () => {
        this.toaster.success('Created successfully')
        this.form.reset()
        this.router.navigate(['/login'])
      }
    })
  }
}

