import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offer?: string
  weekly?: string
  new?: string
  selling?: string

  ngOnInit(): void {
    this.offer = "women"
    this.weekly = "women"
    this.new = "women"
    this.selling = "women"
  }

}
