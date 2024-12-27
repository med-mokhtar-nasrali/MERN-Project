import { Component } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';
import { ContacteComponent } from '../contacte/contacte.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-home',
  imports: [GalleryComponent,ContacteComponent,RouterModule,LoginComponent],
  templateUrl: './home.component.html',
  styleUrls:["./home.component.css"]
})

export class HomeComponent {  
  


}
