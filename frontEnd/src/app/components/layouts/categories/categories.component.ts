import { Component, OnInit } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs';
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

    // this.userService.allCategory().subscribe(console.log)
    const accessToken = localStorage.getItem('accessToken')

    this.userService.allCategories(accessToken).subscribe(
      { next: (res) => { this.allCategory = res, console.log(this.allCategory) } })

    this.userService.allCategory().pipe(
      mergeMap((response: any) => response),
      map((item: any) => {
        return item.categories
      })
    ).subscribe(
      {
        next: (res) => this.uniqueArray = res,
        error: (e) => console.log(e),
        complete: () => console.log('finished')
      }
    )
  }
}
