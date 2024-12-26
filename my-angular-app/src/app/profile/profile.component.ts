import { Component } from '@angular/core';
import { EditeComponent } from '../edite/edite.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  imports: [EditeComponent,RouterModule,NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css','../profile/profile.component.css']
})
export class ProfileComponent {

}
