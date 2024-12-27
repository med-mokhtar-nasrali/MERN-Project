import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; 
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';  // Correct import of Router from @angular/router
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };  // Model for binding the form data
  errorMessage = '';  // Error message to display on failure
  successMessage = '';  // Success message on successful login

  constructor(private apiService: ApiService, private router: Router) {}

  // Method to handle form submission
  loginUser(): void {
    this.apiService.login(this.loginData).subscribe({
      next: (response) => {
        console.log(response);  // Log the response to see the token and user ID
        this.successMessage = 'Login successful!';  // Show success message
        this.errorMessage = '';  // Clear any previous error messages
        
        // Store the JWT token in local storage
        localStorage.setItem('token', response.token);
        
        // Optionally, store the user ID or other necessary info
        localStorage.setItem('userId', response.id);

        // Redirect to a protected route (e.g., home)
        this.router.navigate(['/chat/5858226']);
      },
      error: (error) => {
        this.errorMessage = error.login.message;
        console.log(error.login.message)
        this.successMessage = '';  // Clear success message if present
        console.error('Login error:', error);  // Log the error for debugging
      }
    });
  }
}