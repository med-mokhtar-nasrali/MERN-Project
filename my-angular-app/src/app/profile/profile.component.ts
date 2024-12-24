import { Component } from '@angular/core';
import { EditeComponent } from '../edite/edite.component';

@Component({
  selector: 'app-profile',
  imports: [EditeComponent],
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css','../profile/profile.component.css']
})
export class ProfileComponent {

}
