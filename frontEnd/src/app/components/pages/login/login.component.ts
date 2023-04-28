import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // onTogglePasswordShow() {
  //   this.passwordVisible = !this.passwordVisible
  // }
  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]]
    })
  }
  get fc() {
    return this.form.controls
  }

  login(Data: any) {
    this.userService.loginUser(Data).subscribe(console.log)
  }


}
