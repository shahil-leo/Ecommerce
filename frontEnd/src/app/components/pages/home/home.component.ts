import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  women?: string = "women"
  weekly?: string = 'men'
  ngOnInit(): void {
    this.women = "women"
    this.weekly = "Weekly"
  }

}
