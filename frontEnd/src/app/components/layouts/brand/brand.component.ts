import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { brand, fullBrandResponse } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  brandsRes: brand[] = []
  brandsArray: string[] = []
  uniqueBrand: string[] = []
  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) {

    this.userService.getAllBrand().subscribe({
      next: (res) => {
        this.brandsRes = res
        this.brandsRes.map((element: fullBrandResponse) => {
          this.brandsArray.push(element.brand)
          this.uniqueBrand = [...new Set(this.brandsArray)]
        })
      }, error: (e: HttpErrorResponse) => { this.toaster.error(e.error) },
    })
  }


}
