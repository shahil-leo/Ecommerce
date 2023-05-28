import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BrandResponse } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private userService: UserService) { }


  uniqueArray: string[] = []
  allCategory: BrandResponse[] = []

  ngOnInit(): void {
    this.userService.allCategories().subscribe(
      { next: (res: any) => this.allCategory = res })
  }
}
