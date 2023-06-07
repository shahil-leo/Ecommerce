import { Component } from '@angular/core';
import { fadeInOut } from './router.animation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut]
})
export class AppComponent {
  [x: string]: any;
  title = 'frontEnd';

}
