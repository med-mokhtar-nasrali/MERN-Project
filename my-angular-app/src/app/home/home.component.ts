import { Component } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';
import { ContacteComponent } from '../contacte/contacte.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [GalleryComponent, ContacteComponent, RouterModule, LoginComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.css"]
})

export class HomeComponent {

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

}
