import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isTrue: boolean = false
  product!: any
  user!: any
  accessToken = localStorage.getItem('accessToken')

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.everyFunction()
  }

  deleteProduct(userId: string) {
    this.adminService.deleteOneUser(this.accessToken, userId).subscribe({
      next: (res) => { console.log(res) },
      error: (e) => { console.log(e) },
      complete: () => { this.everyFunction(), console.log('deleted the Product') }
    })
  }
  everyFunction() {
    this.adminService.getAllUsers(this.accessToken).subscribe({
      next: (res) => { this.user = res },
      error: (e) => { console.log(e) },
      complete: () => { console.log('got the user') }
    })
  }


}
