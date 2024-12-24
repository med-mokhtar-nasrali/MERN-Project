import { Component } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';
import { ContacteComponent } from '../contacte/contacte.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [GalleryComponent,ContacteComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl:"./home.component.css"

})
export class HomeComponent {  
  


}
