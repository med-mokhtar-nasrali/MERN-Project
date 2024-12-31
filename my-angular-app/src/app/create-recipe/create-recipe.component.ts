import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Make sure ApiService is properly configured for API calls.
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { NavbarComponent } from '../navbar/navbar.component';

interface City {
  name: string;
  code: string;
}

interface NewRecipe {
  recipeName: string;
  recipeDuration: number;
  recipeDirections: string;
  recipeDescription: string;
  recipeCategory: string;
  recipeType: string;
  recipeImg: string;
  recipeIngredients: string[];
}

@Component({
  selector: 'app-create-recipe',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    NavbarComponent,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'], // Fixed typo in `styleUrl`.
})
export class CreateRecipeComponent implements OnInit {
  Ingredients: City[] = [];
  ingredients: City[] = [];
  newRespi: NewRecipe = {
    recipeName: '',
    recipeDuration: 0,
    recipeDirections: '',
    recipeDescription: '',
    recipeCategory: '',
    recipeType: '',
    recipeImg: '',
    recipeIngredients: [],
  };
  errorMessage: any = {};
  image: File = new File([], '');
  postedBy = localStorage.getItem('user_id');

  
  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit() {
    
    this.Ingredients = [
      { name: 'Salt', code: 'SLT' },
      { name: 'Pepper', code: 'PPR' },
      { name: 'Olive oil', code: 'OO' },
      // Add more recipeIngredients as needed...
    ];
  }
  onFileSelected(event: any): void{
    this.image = event.target.files[0];
  }
  

  addrecipe() {
    console.log(this.ingredients);
    // Include selected recipeIngredients
    this.newRespi.recipeIngredients = this.ingredients.map((ingredient) => ingredient.name);
    this.newRespi.recipeImg = this.image.name;
    console.log(this.newRespi); // Log the data being sent to the server
    this.apiService.createRecipe(this.newRespi).subscribe({
      next: (response) => {
        if (this.image) {
          this.apiService.uploadImage(this.image).subscribe({
            next: (response) => {
              console.log('Image uploaded successfully:', response);
            },
            error: (err) => {
              console.error('Error uploading image:', err);
            }
          });
        }
        console.log('Recipe added successfully:', response);
        this.router.navigate(['/recipes']); // Redirect to recipes list after success.
      },
      error: (err) => {
        this.errorMessage = err; // Display error message on the template.
        console.error('Error adding recipe:', this.errorMessage);
      }
    });
    
  }
}
