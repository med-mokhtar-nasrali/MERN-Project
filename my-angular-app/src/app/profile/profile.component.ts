import { Component, OnInit } from '@angular/core';
import { EditeComponent } from '../edite/edite.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [EditeComponent, RouterModule, NavbarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../profile/profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any = null; // Add a property for the current user
  userRecipes: any[] = []; // Add a property for the user's recipes

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    if (userId) {
      this.fetchCurrentUser(userId);
      this.fetchUserRecipes(userId);
    }
  }

  fetchCurrentUser(userId: string): void {
    this.apiService.getUserById(userId).subscribe(
      data => {
        console.log('Fetched current user:', data);
        this.currentUser = data;
      },
      error => console.error('Error fetching current user', error)
    );
  }

  fetchUserRecipes(userId: string): void {
    this.apiService.getRecipesByUserId(userId).subscribe(
      data => {
        console.log('Fetched user recipes:', data);
        this.userRecipes = data;
      },
      error => console.error('Error fetching user recipes', error)
    );
  }
}
