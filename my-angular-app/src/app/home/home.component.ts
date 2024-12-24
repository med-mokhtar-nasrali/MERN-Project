import { Component } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';
import { ContacteComponent } from '../contacte/contacte.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { LoginSignUpComponent } from '../login-sign-up/login-sign-up.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-home',
  imports: [GalleryComponent,ContacteComponent,RouterModule,LoginComponent,SignUpComponent],
  templateUrl: './home.component.html',
  styleUrls:["./home.component.css"]
})

export class HomeComponent {  
  


}
