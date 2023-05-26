import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  DateCurrent?: any


  ngOnInit(): void {
    this.DateCurrent = new Date().getFullYear()
    console.log(this.DateCurrent)
  }

}
