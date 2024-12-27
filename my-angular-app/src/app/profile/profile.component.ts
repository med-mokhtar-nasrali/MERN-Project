import { Component } from '@angular/core';
import { EditeComponent } from '../edite/edite.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [EditeComponent,RouterModule],
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css','../profile/profile.component.css']
})
export class ProfileComponent {

}
