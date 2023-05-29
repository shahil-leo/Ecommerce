import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  forms: FormGroup
  isTrue: boolean = false
  category!: any
  product!: any
  editProduct: string = 'Add'
  selectedFile?: File
  editSingleProductId!: any


  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.forms = this.fb.group<any>({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', [Validators.required]],
      size: ['', [Validators.required]],
      color: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      category: [false, Validators.required]
    })
  }

  ngOnInit(): void {
    this.everyFunction()
  }

  deleteProduct(productId: string) {
    console.log(productId)
    this.adminService.deleteOneProduct(productId,).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e) },
      complete: () => { this.everyFunction(), console.log('deleted the Product') }
    })
  }

  submit() {
    if (!(this.editProduct === 'Edit')) {
      if (!(this.selectedFile)) return

      const fd = new FormData()
      const { value } = this.forms
      for (let k in value) {
        if (k === 'image')
          fd.append('file', this.selectedFile, this.selectedFile.name);
        else {
          fd.append(k, value[k]);
        }
      }
      this.adminService.addOneProduct(fd).subscribe({
        next: (res) => { console.log(res), this.everyFunction() },
        error: (e) => { console.log(e) },
        complete: () => { this.everyFunction(), console.log('Added a product') }
      })
      this.forms.reset()
    } else {
      console.log('edit')
      console.log(this.forms.value)
      console.log(this.editSingleProductId)
      this.adminService.updateOneProduct(this.editSingleProductId, this.forms.value).subscribe({ next: (res) => { console.log(res) }, error: (e) => { console.log(e) }, complete: () => { this.everyFunction() } })
    }
  }

  open() {
    this.isTrue = !this.isTrue
  }

  onFileChange(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files?.[0];
  }

  get fc() {
    return this.forms.controls
  }

  everyFunction() {
    this.adminService.getAllCategory().subscribe({
      next: (res) => { this.category = res },
      error: (e) => { console.log(e) },
      complete: () => { console.log('completed the category') }
    })
    this.adminService.getAllProduct().subscribe({
      next: (res) => { this.product = res, console.log(this.product) },
      error: (e) => { console.log(e) },
      complete: () => { console.log('completed the all product') }
    })
  }

  editProducts(id: string) {
    this.editProduct = 'Edit'
    this.isTrue = !this.isTrue
    this.editSingleProductId = id
    this.adminService.getOneProductEdit(id).subscribe({
      next: (res: any) => {
        const { title, description, size, color, prize, brand, image } = res
        this.fc['title'].setValue(title)
        this.fc['description'].setValue(description)
        this.fc['size'].setValue(size)
        this.fc['color'].setValue(color)
        this.fc['price'].setValue(prize)
        this.fc['brand'].setValue(brand)
      },
      error: (e) => { console.log(e) },
      complete: () => { this.everyFunction(), console.log('got the Product') }
    })

  }


}
