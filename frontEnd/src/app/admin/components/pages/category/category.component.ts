import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    private adminService: AdminService,
    private toaster: ToastrService
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

  onChangeImage(e: Event) {
    this.selectedImgCategory = (e.target as HTMLInputElement).files?.[0];
  }

  submit(): void {

    const fd: FormData = new FormData()

    fd.append('category', this.fc['category'].value)
    fd.append('file', this.selectedImgCategory as File, this.selectedImgCategory?.name)

    this.adminService.addOneCategory(fd).subscribe({
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
      complete: () => this.everyFunction()
    })
    this.forms.reset()
  }

  everyFunction() {
    this.adminService.getAllCategory().subscribe({
      next: (res) => this.allCategory = res,
      error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }

  deleteOne(productId: string) {
    this.adminService.deleteOneCategory(productId).subscribe({
      error: (e: HttpErrorResponse) => this.toaster.error(e.error),
      complete: () => this.everyFunction()
    })
  }


}
