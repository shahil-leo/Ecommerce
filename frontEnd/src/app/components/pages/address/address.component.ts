import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {




  productArray: any
  totalAmount!: number
  totalQuantity!: number

  forms: FormGroup

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.forms = this.fb.group<any>({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
      pincode: ['', [Validators.required, Validators.maxLength(7)]],
      locality: ['', Validators.required],
      Address: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      landmark: ['', Validators.minLength(3)],
      alternativePhone: ['', Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]
    })
  }

  get fc() {
    return this.forms.controls
  }


  ngOnInit(): void {
    this.productArray = this.userService.productArray
    this.totalAmount = this.userService.totalAmount
    this.totalQuantity = this.userService.quantity
    console.log(this.productArray, this.totalAmount, this.totalQuantity)
  }

  submit() {
    console.log('su')
    console.log(this.forms.value)
  }

}
