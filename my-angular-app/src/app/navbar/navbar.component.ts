import { Component } from '@angular/core';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-navbar',
  imports: [CreateComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../home/home.component.css']
})
export class NavbarComponent {

}
