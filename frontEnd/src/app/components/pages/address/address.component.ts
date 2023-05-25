import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
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

  constructor(
    private userService: UserService, private fb: FormBuilder) {
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
    const userId: any = localStorage.getItem('userId')
    this.userService.getCart(userId).subscribe({
      next: (res: any) => { console.log(res.carts), this.productArray = res.carts, this.calculateSum(), console.log(this.productArray) },
      error: (error: Error) => { console.log(error) },
    })
  }
  calculateSum() {
    console.log('calculate sum')
    this.totalAmount = this.productArray.reduce((total: any, product: any) => {
      const productTotal = product.prize * product.quantity;
      return total + productTotal;
    }, 0);
    console.log(this.totalAmount)
    this.totalQuantity = this.productArray.reduce((total: any, product: any) => {
      const quantity = +product.quantity
      return total + quantity
    }, 0)
  }

  submit() {
    if (!(this.productArray === undefined)) {
      console.log(this.forms.value)
      const userId: any = localStorage.getItem('userId')
      this.userService.stripe(userId, this.productArray).subscribe(async (res: any) => {
        console.log(res)
        let stripe = await loadStripe('pk_test_51LQ9JfSBfNSorDV7IRbz8kMSMAWJ5Kj5nnua4DFoGwF6kC4QEymmabhfmlzaW3IVDucpRNnhOrfL6ZpbIHJcbW4U00rD9MDqTw');
        stripe?.redirectToCheckout({
          sessionId: res?.id
        })
        if (res) {
          this.userService.addOrder(userId, this.forms.value, this.productArray, this.totalAmount).subscribe(console.log)
        }
      })

    }
  }
}
