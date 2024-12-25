import { Component } from '@angular/core';
import { EditeComponent } from '../edite/edite.component';
import { ChowOneComponent } from '../chow-one/chow-one.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [EditeComponent,ChowOneComponent,RouterModule],
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css','../profile/profile.component.css']
})
export class ProfileComponent {

}
