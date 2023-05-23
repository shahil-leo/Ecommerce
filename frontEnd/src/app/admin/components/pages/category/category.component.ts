import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  forms!: FormGroup
  isTrue: boolean = false
  accessToken = localStorage.getItem('accessToken')
  allCategory!: any
  Edit!: string
  singleCategory!: any
  productId!: string

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.forms = this.fb.group<any>({
      category: ['', [Validators.required, Validators.minLength(2)]],
      categoryImg: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.everyFunction()
  }

  open() {
    this.isTrue = !this.isTrue
  }


  get fc() {
    return this.forms.controls
  }
  submit() {
    if (!this.Edit) {
      console.log(this.forms.value)
      this.adminService.addOneCategory(this.accessToken, this.forms.value).subscribe({
        next: (res) => { console.log(res), this.everyFunction() },
        error: (e) => { console.log(e) },
        complete: () => { console.log('submited the form') }
      })
      this.forms.reset()
    } else {
      this.adminService.updateOneCategory(this.accessToken, this.productId, this.forms.value).subscribe({
        next: (res) => { console.log(res) },
        error: (e) => { console.log(e) },
        complete: () => { this.everyFunction(), console.log('updated the  Product') }
      })
    }

  }
  everyFunction() {
    this.adminService.getAllCategory(this.accessToken).subscribe({
      next: (res) => { this.allCategory = res },
      error: (e) => { console.log(e) },
      complete: () => { console.log('getting every category') }
    })
  }
  deleteOne(productId: string) {
    this.adminService.deleteOneCategory(this.accessToken, productId).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e) },
      complete: () => { this.everyFunction(), console.log('deleted the Product') }
    })
  }
  edit(productId: string) {
    this.Edit = 'Edit'
    this.productId = productId
    this.isTrue = !this.isTrue
    this.adminService.getOneCategory(this.accessToken, productId).subscribe({
      next: (res: any) => {
        this.fc['category'].setValue(res.categories)
      },
      error: (e) => { console.log(e) },
      complete: () => { this.everyFunction() }
    })
  }

}
