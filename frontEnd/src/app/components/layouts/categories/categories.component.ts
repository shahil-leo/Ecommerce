import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private userService: UserService) { }


  uniqueArray: string[] = []
  allCategory: any[] = []

  ngOnInit(): void {


    this.userService.allCategories().subscribe(
      { next: (res) => { this.allCategory = res, console.log(this.allCategory) } })

  }
}
