import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sm-category',
  templateUrl: './sm-category.component.html',
  styleUrls: ['./sm-category.component.scss']
})
export class SmCategoryComponent implements OnInit {

  productArray: any = []
  @Input() category?: string

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.findCategory(this.category).subscribe({ next: (res) => { this.productArray = res } })
  }

}
