import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule ,Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-up',
  standalone: true, // Required for standalone components
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // Fixed typo
})
export class SignUpComponent {
  newUser: any = {}; // Object to store form data
  successMessage: string = ''; // Message displayed on successful user creation
  errorMessage:any = {}; // Display errors as string for easier handling in template

  constructor(private apiService: ApiService, private router: Router) {}

  addUser(): void {
    console.log(this.newUser);  // Log the data being sent to the server
    this.apiService.createUser(this.newUser).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = 'User registered successfully!';
        this.errorMessage = ''; // Clear any previous errors
        this.newUser = {}; // Reset form after successful submission
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error ; // Handle backend error
        // this.successMessage = ''; // Clear success message if present
        console.error('Error adding user:', error);
      }
    });
  }
}
