import { Component } from '@angular/core';
import { ProfileService } from 'src/app/profile/service/profile.service';

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.scss']
})
export class SingleProfileComponent {

  allOrderList: any = []
  newArray: any = []

  constructor(private profileService: ProfileService) { }

  singleUser: any

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    this.profileService.getSingleUser().subscribe({
      next: (res) => { this.singleUser = res },
      error: (e) => { console.log(e) }
    })
  }


}
