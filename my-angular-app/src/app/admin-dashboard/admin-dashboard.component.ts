import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: any[] = [];
  recipes: any[] = [];
  userCount: number | null = null;
  currentUserRole: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.currentUserRole = localStorage.getItem('userRole');
    console.log('Current user role:', this.currentUserRole);

    if (this.currentUserRole === 'admin') {
      this.fetchUsers();
      this.fetchRecipes();
    } else {
      console.error('Access denied. Admins only.');
      alert('Access denied. Admins only.');
    }
  }

  fetchUsers(): void {
    this.apiService.getAllUsersAdmin().subscribe(
      data => {
        console.log('Fetched users:', data);
        this.users = data;
      },
      error => console.error('Error fetching users', error)
    );
  }

  fetchRecipes(): void {
    this.apiService.getAllRecipes().subscribe(
      data => {
        console.log('Fetched recipes:', data);
        this.recipes = data;
      },
      error => console.error('Error fetching recipes', error)
    );
  }

  deleteUser(userId: string): void {
    this.apiService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted:', userId);
        this.users = this.users.filter(user => user._id !== userId);
      },
      error => console.error('Error deleting user', error)
    );
  }

  deleteRecipe(recipeId: string): void {
    this.apiService.deleteRecipe(recipeId).subscribe(
      () => {
        console.log('Recipe deleted:', recipeId);
        this.recipes = this.recipes.filter(recipe => recipe._id !== recipeId);
      },
      error => console.error('Error deleting recipe', error)
    );
  }


}
