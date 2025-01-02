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


  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit() {

    this.Ingredients = [
      { name: "Salt", code: "SLT" },
      { name: "Pepper", code: "PPR" },
      { name: "Olive oil", code: "OO" },
      { name: "Vegetable oil", code: "VO" },
      { name: "Butter", code: "BTR" },
      { name: "Sugar (white, brown)", code: "SGR" },
      { name: "Flour (all-purpose, whole wheat)", code: "FLR" },
      { name: "Baking powder", code: "BP" },
      { name: "Baking soda", code: "BS" },
      { name: "Vinegar (white, apple cider, balsamic)", code: "VNR" },
      { name: "Honey", code: "HNY" },
      { name: "Soy sauce", code: "SS" },
      { name: "Mustard", code: "MST" },
      { name: "Ketchup", code: "KCH" },
      { name: "Mayonnaise", code: "MAY" },
      { name: "Peanut butter", code: "PB" },
      { name: "Jam or jelly", code: "JM" },
      { name: "Vanilla extract", code: "VE" },
      { name: "Canned tomatoes", code: "CTM" },
      { name: "Tomato paste", code: "TP" },
      { name: "Chicken broth", code: "CB" },
      { name: "Beef broth", code: "BB" },
      { name: "Vegetable broth", code: "VB" },
      { name: "Canned beans (black beans, chickpeas, kidney beans)", code: "CBN" },
      { name: "Canned corn", code: "CCN" },
      { name: "Canned tuna", code: "CTN" },
      { name: "Canned sardines", code: "CSD" },
      { name: "Cumin", code: "CMN" },
      { name: "Paprika", code: "PPRK" },
      { name: "Chili powder", code: "CP" },
      { name: "Cinnamon", code: "CIN" },
      { name: "Nutmeg", code: "NTM" },
      { name: "Turmeric", code: "TRM" },
      { name: "Curry powder", code: "CRP" },
      { name: "Oregano", code: "ORG" },
      { name: "Basil", code: "BAS" },
      { name: "Thyme", code: "THY" },
      { name: "Rosemary", code: "RSM" },
      { name: "Parsley", code: "PRL" },
      { name: "Bay leaves", code: "BL" },
      { name: "Garlic powder", code: "GP" },
      { name: "Onion powder", code: "OP" },
      { name: "Red pepper flakes", code: "RPF" },
      { name: "Rice (white, brown, basmati, jasmine)", code: "RC" },
      { name: "Pasta (spaghetti, penne, macaroni)", code: "PST" },
      { name: "Quinoa", code: "QNA" },
      { name: "Couscous", code: "CC" },
      { name: "Lentils", code: "LNT" },
      { name: "Oats", code: "OAT" },
      { name: "Bread", code: "BRD" },
      { name: "Breadcrumbs", code: "BC" },
      { name: "Garlic", code: "GRL" },
      { name: "Onions (yellow, red, green)", code: "ON" },
      { name: "Tomatoes", code: "TMT" },
      { name: "Potatoes", code: "POT" },
      { name: "Carrots", code: "CRT" },
      { name: "Celery", code: "CLY" },
      { name: "Bell peppers (red, green, yellow)", code: "BP" },
      { name: "Spinach", code: "SPN" },
      { name: "Lettuce", code: "LTC" },
      { name: "Cucumbers", code: "CUC" },
      { name: "Zucchini", code: "ZUC" },
      { name: "Lemons", code: "LEM" },
      { name: "Limes", code: "LIM" },
      { name: "Avocado", code: "AVC" },
      { name: "Milk (cow, almond, soy)", code: "MLK" },
      { name: "Cream", code: "CRM" },
      { name: "Yogurt", code: "YGT" },
      { name: "Cheese (cheddar, mozzarella, parmesan)", code: "CHS" },
      { name: "Eggs", code: "EGG" },
      { name: "Frozen vegetables (peas, corn, mixed vegetables)", code: "FV" },
      { name: "Frozen fruits (berries, mango, pineapple)", code: "FF" },
      { name: "Tortillas", code: "TRL" },
      { name: "Crackers", code: "CRK" },
      { name: "Nuts (almonds, walnuts, cashews)", code: "NUT" },
      { name: "Dried fruits (raisins, cranberries, apricots)", code: "DF" }
    ];
  }
  onFileSelected(event: any): void {
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
