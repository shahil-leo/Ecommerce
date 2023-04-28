import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { RegisterUser } from 'src/app/models/register-user';
import { UserService } from 'src/app/services/user.service';

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
    private toaster: ToastrModule
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]],
      confirmPassword: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]]
    })
  }
  get fc() {
    return this.form.controls
  }
  formSubmit(formData: RegisterUser) {
    console.log(formData)
    if (!(formData.password === formData.confirmPassword)) return console.log('password is not same')
    this.userService.registerUser(formData).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e.error) },
      complete: () => {
        this.form.reset()
        this.router.navigate(['/login'])
      }
    })
  }
}

