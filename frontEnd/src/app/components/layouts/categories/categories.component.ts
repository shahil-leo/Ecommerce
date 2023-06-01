import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { CategoryFullRes } from 'src/app/shared/interfaces/allinterfaceApp';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private toaster: ToastrService,
    private userService: UserService
  ) { }

  uniqueArray: string[] = []
  allCategory: CategoryFullRes[] = []

  ngOnInit(): void {
    this.userService.allCategories().subscribe(
      {
        next: (res) => this.allCategory = res,
        error: (e: HttpErrorResponse) => this.toaster.error(e.error)
      })
  }
}
