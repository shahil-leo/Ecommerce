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
  allCategory!: any
  singleCategory!: any
  productId!: string
  selectedImgCategory?: File

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

  onChangeImage(e: any) {
    this.selectedImgCategory = (e.target as HTMLInputElement).files?.[0];
  }

  submit() {

    const fd = new FormData()

    fd.append('category', this.fc['category'].value)
    fd.append('file', this.selectedImgCategory as File, this.selectedImgCategory?.name)

    this.adminService.addOneCategory(fd).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e) },
      complete: () => { this.everyFunction(), console.log('submited the form') }
    })
    this.forms.reset()
  }

  everyFunction() {
    this.adminService.getAllCategory().subscribe({
      next: (res) => { this.allCategory = res },
      error: (e) => { console.log(e) },
      complete: () => { console.log('getting every category') }
    })
  }

  deleteOne(productId: string) {
    this.adminService.deleteOneCategory(productId).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e) },
      complete: () => { this.everyFunction(), console.log('deleted the Product') }
    })
  }


}
