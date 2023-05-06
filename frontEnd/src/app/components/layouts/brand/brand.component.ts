import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  brandsRes: [] = []
  brandsArray: string[] = []
  uniqueBrand: string[] = []
  constructor(private userService: UserService) {


    userService.getAllBrand().subscribe({
      next: (res: any) => {
        this.brandsRes = res
        this.brandsRes.map((element: any) => {
          this.brandsArray.push(element.brand)
          this.uniqueBrand = [...new Set(this.brandsArray)]
        })
      }, error: (e) => { console.log(e) },
      complete: () => { }
    })
  }


}
