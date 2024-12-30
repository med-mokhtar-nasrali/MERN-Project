import { Component, OnInit } from '@angular/core';
import { NewRes } from '../new-res';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectComponent } from '../select/select.component';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent implements OnInit {
  cities!: City[];
  selectedCities!: City[];
  newRecipe: any = {};
  successMessage: string = ''; // Message displayed on successful user creation
  errorMessage: any = {}; // Display errors as string for easier handling in template

  constructor(private apiService: ApiService, private router: Router) {}

  async ngOnInit() {
    this.cities = [
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
    console.log(this.cities);
  }

  async addRecipe() {
    try {
      console.log(this.newRecipe);  // Log the data being sent to the server
      const response = await this.apiService.createRecipe(this.newRecipe).toPromise();
      console.log(response);
      this.successMessage = 'Recipe added successfully!';
      this.errorMessage = ''; // Clear any previous errors
      this.newRecipe = {}; // Reset form after successful submission
      this.router.navigate(['/all-post']);
    } catch (error) {
      this.errorMessage = error // Handle backend error
      console.log('Error adding recipe:', error);
    }
  }
}
