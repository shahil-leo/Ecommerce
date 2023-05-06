import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sm-category',
  templateUrl: './sm-category.component.html',
  styleUrls: ['./sm-category.component.scss']
})
export class SmCategoryComponent {

  productArray: any = []

  constructor(private userService: UserService) {
    this.userService.findCategory('women').subscribe({ next: (res) => { this.productArray = res, console.log(res) } })
  }
}
