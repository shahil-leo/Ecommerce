import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private userService: UserService) { }

  categoriesArray!: []
  stringArray: string[] = []
  filterArray: string[] = []
  uniqueArray: string[] = []

  ngOnInit(): void {
    this.userService.allCategory().subscribe(
      {
        next: (res: any) => {
          this.categoriesArray = res
          this.categoriesArray.map((element: any) => {
            element.categories.map((element: any) => {
              this.stringArray.push(element)
              this.uniqueArray = [...new Set(this.stringArray)]
            })
          })

        },
        error: (e: any) => console.log(e),
        complete: () => { console.log('completed everything'), console.log(this.uniqueArray) }
      }
    )
  }
}
